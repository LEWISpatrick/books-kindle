import { auth } from '@/auth'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const existingStripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.user.id
      }
    })

    let stripeCustomerId: string

    if (existingStripeCustomer) {
      stripeCustomerId = existingStripeCustomer.stripeCustomerId
    } else {
      const customer = await stripe.customers.create({
        email: user.user.email!
      })
      await db.stripeCustomer.create({
        data: {
          userId: user.user.id,
          stripeCustomerId: customer.id
        }
      })
      stripeCustomerId = customer.id
    }

    const stripePurchase = await db.purchase.findFirst({
      where: {
        userId: user.user.id
      }
    })

    if (stripePurchase) {
      return new NextResponse('Purchase already exists', { status: 400 })
    }

    const coupon = await stripe.coupons.create({
      percent_off: 70,
      duration: 'once',
      name: 'First 15 Clients (3 Left) 70% Discount',
    });

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: process.env.APP_URL,
      cancel_url: process.env.APP_URL,
      payment_method_types: ['card'],
      mode: 'payment',
      billing_address_collection: 'auto',
      customer: stripeCustomerId,
      discounts: [
        {
          coupon: coupon.id,
        },
      ],
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'Books Kindle Package',
              description: 'Ultimate package for book lovers',
            },
            unit_amount: 7000, // Original price in cents ($66.67)
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'Stripe Fee',
            },
            unit_amount: 303, // Fee amount in cents ($3.03)
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.user.id,
        stripeCustomerId: stripeCustomerId,
      },
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log('[STRIPE_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
