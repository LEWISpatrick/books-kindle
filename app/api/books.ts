// pages/api/books.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch('https://librivox.org/api/feed/audiobooks/?format=json');
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
}
