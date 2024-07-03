'use client';

import { useEffect, useState } from 'react';

export interface Book {
  id: number;
  title: string;
  author: string;
  downloadLink: string;
  audioLink: string;
}

const fetchBooks = async (): Promise<Book[]> => {
  try {
    const ob = { /* your object data here */ };
    const res = await fetch('https://librivox.org/api/feed/audiobooks/id/52', {
      mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ob)
    });

    if (!res.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await res.json();
    return data.books.map((book: any) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      downloadLink: book.downloadLink,
      audioLink: book.audioLink,
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};
const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks()
      .then(setBooks)
      .catch((err) => setError(err.message));
  }, []);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  return (
    <div className="container mx-auto p-4">
      {error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : selectedBook ? (
        <div>
          <h2 className="text-2xl font-bold">{selectedBook.title}</h2>
          <p>Author: {selectedBook.author}</p>
          <a href={selectedBook.downloadLink} className="text-blue-500" download>
            Download PDF
          </a>
          <a href={selectedBook.audioLink} className="text-blue-500" download>
            Download Audiobook
          </a>
          <button
            onClick={() => setSelectedBook(null)}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Back
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="p-4 border rounded shadow hover:bg-gray-100"
              onClick={() => handleBookClick(book)}
            >
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p>Author: {book.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
