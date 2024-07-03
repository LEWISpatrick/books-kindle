import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db'; // Ensure this path is correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, author, description, imageUrl, downloadLink, category, userId } = req.body;

    try {
      const book = await db.book.create({
        data: {
          title,
          author,
          description,
          imageUrl,
          downloadLink,
          category,
          userId,
        },
      });
      res.status(201).json(book);
    } catch (error: any) {
      console.error('Error creating book:', error);
      res.status(500).json({ error: error.message || 'Error creating book' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
