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

    const appUrl = process.env.APP_URL
    if (!appUrl) {
      console.error('APP_URL is not defined')
      return new NextResponse('Internal Server Error', { status: 500 })
    }

    // Check if the user has an existing purchase
    const purchase = await db.purchase.findFirst({
      where: {
        userId: user.user.id
      },
      include: {
        stripeCustomer: true
      }
    })

    // If purchase exists, redirect to the Stripe billing portal
    if (purchase && purchase.stripeCustomer?.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: purchase.stripeCustomer.stripeCustomerId,
        return_url: appUrl
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }), { status: 200 })
    }

    // Create a checkout session for a one-time payment
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: appUrl,
      cancel_url: appUrl,
      payment_method_types: ['card'],
      mode: 'payment',
      billing_address_collection: 'auto',
      customer_email: user?.user.email!,
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'Books Kindle Package',
              description: 'Ultimate package for book lovers'
            },
            unit_amount: 2999
          },
          quantity: 1
        }
      ],
      metadata: {
        userId: user.user.id
      }
    })

    // Create or connect the StripeCustomer
    let stripeCustomer = purchase?.stripeCustomer
    if (!stripeCustomer) {
      const newStripeCustomer = await stripe.customers.create({
        email: user.user.email || undefined
      })
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.user.id,
          stripeCustomerId: newStripeCustomer.id
        }
      })
    }

    // Record the purchase in the database
    await db.purchase.create({
      data: {
        userId: user.user.id,
        amount: 2999,
        stripeCustomerId: stripeCustomer.id,
        createdAt: new Date(),
      }
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }), { status: 200 })
  } catch (error) {
    console.error('Error processing the purchase:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
