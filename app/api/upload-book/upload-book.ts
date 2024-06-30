// pages/api/upload-book.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db'; // Assuming db is properly set up to interact with your database
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = await auth()

    if (!user || !user.user.id) {
      console.error('Authentication failed or user ID is missing.')
      return new NextResponse('Unauthorized', { status: 401 })
    }
    if (req.method === 'POST') {
    const { title, author, description, imageUrl, downloadLink, category, userId } = req.body;

    try {
        const book = await db.book.create({ // Call the create method on db.book
            data: {
                title,
                author,
                description,
                imageUrl,
                downloadLink,
                category,
                userId, // Ensure userId is included
            },
        });
        res.status(201).json(book);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Error creating book' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
