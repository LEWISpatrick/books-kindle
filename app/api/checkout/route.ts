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

    // Check if the user already has a Stripe customer ID
    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userId: user.user.id
      }
    })

    // If the user has a subscription, create a billing portal session
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: process.env.APP_URL
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }

    // Create a one-time payment session
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.APP_URL}/success`,
      cancel_url: `${process.env.APP_URL}/cancel`,
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
            // Cost in cents (e.g., $5.00)
            unit_amount: 2999
          },
          quantity: 1
        }
      ],
      metadata: {
        userId: user.user.id
      }
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log('[STRIPE_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
