import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  // Handle successful one-time payment
  if (event.type === 'checkout.session.completed') {
    if (!session?.metadata?.userId) {
      return new NextResponse('No user id found', { status: 400 })
    }

    // Check if session.amount_total is not null
    if (session.amount_total === null) {
      return new NextResponse('Amount total is null', { status: 400 })
    }

    const userId = session.metadata.userId

    // Create a new Stripe customer if not exists
    let stripeCustomer = await db.stripeCustomer.findFirst({
      where: { userId }
    })

    if (!stripeCustomer) {
      const newStripeCustomer = await stripe.customers.create({
        email: session.customer_email || undefined
      })

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId,
          stripeCustomerId: newStripeCustomer.id
        }
      })

      console.log('New Stripe customer created:', newStripeCustomer.id)
    }

    // Record the purchase in the database
    await db.purchase.create({
      data: {
        userId,
        amount: session.amount_total / 100, // Amount is in cents, so divide by 100 to get USD
        stripeCustomerId: stripeCustomer.stripeCustomerId, // Updated to match your schema
        createdAt: new Date(),
      }
    })
    console.log('Purchase recorded in the database for user:', userId)
  }

  return new NextResponse(null, { status: 200 })
}
