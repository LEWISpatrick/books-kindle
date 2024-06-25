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

    // Check if the user has a StripeCustomer record
    const stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.user.id
      }
    })

    if (stripeCustomer && stripeCustomer.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: stripeCustomer.stripeCustomerId,
        return_url: process.env.APP_URL
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }

    // Create a checkout session for a one-time payment
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: process.env.APP_URL,
      cancel_url: process.env.APP_URL,
      payment_method_types: ['card'],
      mode: 'payment',
      billing_address_collection: 'auto',
      customer_email: user?.user.email!,
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'Books Kindle Premium',
              description: 'Get Thousands of Free Books and Audiobooks!'
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

    // Record the purchase in the database
    await db.purchase.create({
      data: {
        userId: user.user.id,
        amount: 2999,
        createdAt: new Date(),
      }
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.error('[STRIPE_CHECKOUT_ERROR]', error)

    if (error.type === 'StripeInvalidRequestError') {
      return new NextResponse('Invalid request to Stripe API', { status: 400 })
    }

    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
