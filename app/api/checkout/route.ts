import { auth } from '@/auth'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const user = await auth()

    if (!user || !user.user.id) {
      console.error('Authentication failed or user ID is missing.')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const appUrl = process.env.APP_URL
    if (!appUrl) {
      console.error('APP_URL is not defined')
      return new NextResponse('Internal Server Error', { status: 500 })
    }

    // Check if the user has an existing Stripe customer
    const stripeCustomer = await db.stripeCustomer.findFirst({
      where: {
        userId: user.user.id
      }
    })

    // If Stripe customer exists, redirect to the Stripe billing portal
    if (stripeCustomer) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: stripeCustomer.stripeCustomerId,
        return_url: appUrl
      })

      console.log(`Redirecting to Stripe billing portal: ${stripeSession.url}`)
      return new NextResponse(JSON.stringify({ url: stripeSession.url }), { status: 200 })
    }

    // Create a checkout session for a one-time payment
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
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

    console.log('Stripe checkout session created:', stripeSession.id)

    return new NextResponse(JSON.stringify({ url: stripeSession.url }), { status: 200 })
  } catch (error) {
    console.error('Error processing the purchase:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
