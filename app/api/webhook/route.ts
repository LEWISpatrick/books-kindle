import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Handle successful one-time payment
  if (event.type === 'checkout.session.completed') {
    if (!session?.metadata?.userId) {
      return new NextResponse('No user id found', { status: 400 });
    }

    if (session.amount_total === null) {
      return new NextResponse('Amount total is null', { status: 400 });
    }

    const userId = session.metadata.userId;
    const email = session.customer_email!;

    // Create Stripe customer
    const stripeCustomer = await stripe.customers.create({
      email: email
    });

    // Link Stripe customer to user in the database
    await db.stripeCustomer.create({
      data: {
        userId: userId,
        stripeCustomerId: stripeCustomer.id
      }
    });

    // Record the purchase in the database
    await db.purchase.create({
      data: {
        userId: userId,
        amount: session.amount_total,
        stripeCustomerId: stripeCustomer.id,
        createdAt: new Date(),
      }
    });

    console.log('Purchase recorded in the database for user:', userId);
  }

  return new NextResponse(null, { status: 200 });
}
