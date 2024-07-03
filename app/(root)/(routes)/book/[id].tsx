// pages/book/[id].tsx

import { useRouter } from 'next/router';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface BookDetailProps {
  book: {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      description?: string;
      imageLinks?: {
        thumbnail: string;
      };
    };
    accessInfo?: {
      pdf?: {
        isAvailable?: boolean;
        acsTokenLink?: string;
      };
    };
  };
}

const GOOGLE_BOOKS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

const BookDetail = ({ book }: BookDetailProps) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto p-4">
      {book && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {book.volumeInfo.imageLinks?.thumbnail && (
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="w-full h-64 object-cover" />
          )}
          <div className="p-4">
            <h2 className="text-3xl font-semibold mb-2">{book.volumeInfo.title}</h2>
            <p className="text-gray-600 mb-4">{book.volumeInfo.authors?.join(', ')}</p>
            <p className="text-gray-700 mb-4">{book.volumeInfo.description}</p>
            {book.accessInfo?.pdf?.isAvailable && (
              <a href={book.accessInfo.pdf.acsTokenLink} className="block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-center">
                Download PDF
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;

export async function getServerSideProps({ params }: { params: any }) {
  const { id } = params;
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${GOOGLE_BOOKS_API_KEY}`);
    const book = response.data;
    return {
      props: {
        book,
      },
    };
  } catch (error) {
    console.error('Error fetching book data:', error);
    return {
      notFound: true,
    };
  }
}
