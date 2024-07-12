// pages/api/payments.ts
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const user = await auth();

    if (!user || !user.user.id) {
      console.error('Authentication failed or user ID is missing.');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const appUrl = process.env.APP_URL;
    if (!appUrl) {
      console.error('APP_URL is not defined');
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    // Check if the user has an existing Stripe customer
    const stripeCustomer = await db.stripeCustomer.findFirst({
      where: {
        userId: user.user.id,
      },
    });

    // If Stripe customer exists, redirect to the Stripe billing portal
    if (stripeCustomer) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: stripeCustomer.stripeCustomerId,
        return_url: appUrl,
      });

      console.log(`Redirecting to Stripe billing portal: ${stripeSession.url}`);
      return res.status(200).json({ url: stripeSession.url });
    } else {
      return res.status(404).json({ message: 'Stripe customer not found' });
    }
  } catch (error) {
    console.error('Error processing the purchase:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
