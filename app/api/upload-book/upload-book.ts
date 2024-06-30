// pages/api/upload-book.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db'; // Assuming db is properly set up to interact with your database

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, author, description, imageUrl, downloadLink, category, userId } = req.body;

    try {
        const book = await db.book.create({
            data: {
                title: title,
                author: author,
                description: description,
                imageUrl: imageUrl,
                downloadLink: downloadLink,
                category: category,
                userId: userId,
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
