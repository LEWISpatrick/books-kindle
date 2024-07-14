import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { auth } from '@/auth'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string
  const user = await auth()

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

  if (event.type === 'checkout.session.completed') {
    if (!session?.metadata?.userId || !session?.metadata?.stripeCustomerId) {
      return new NextResponse('No user id or stripe customer id found', { status: 400 })
    }

    const amount = session.amount_total ?? 0; // Use 0 if session.amount_total is null
    await db.purchase.create({
      data: {
        userId: session.metadata.userId,
        stripeCustomerId: session.metadata.stripeCustomerId,
        amount: amount / 100 // Convert from cents to dollars
        
      }
    })
    
  }
  else {
    return new NextResponse(`Webhook Error: Unsupported event type ${event.type}`, { status: 200 });
  }
  return new NextResponse(null, { status: 200 })
}
