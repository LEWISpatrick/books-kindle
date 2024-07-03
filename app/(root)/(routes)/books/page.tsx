// pages/books.tsx
'use client'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Search } from 'lucide-react';

interface Book {
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
    epub?: {
      isAvailable?: boolean;
      acsTokenLink?: string;
    };
  };
}

const GOOGLE_BOOKS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('fiction'); // Default genre
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const selectedBookRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBooks(selectedGenre);
  }, [selectedGenre]);

  const fetchBooks = (genre: string) => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&key=${GOOGLE_BOOKS_API_KEY}`)
      .then(response => {
        setBooks(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') return; // Don't search if the search term is empty
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${GOOGLE_BOOKS_API_KEY}`)
      .then(response => {
        setBooks(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const showBookDetails = (book: Book) => {
    setSelectedBook(book);
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <div className="flex mb-4 space-x-4 overflow-x-auto">
        <button
          className={`px-3 py-1 rounded-lg ${
            selectedGenre === 'fiction' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setSelectedGenre('fiction')}
        >
          <Sparkles className="h-5 w-5" />
          <span>Fiction</span>
        </button>
        <button
          className={`px-3 py-1 rounded-lg ${
            selectedGenre === 'drama' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setSelectedGenre('drama')}
        >
          <Sparkles className="h-5 w-5" />
          <span>Drama</span>
        </button>
        <button
          className={`px-3 py-1 rounded-lg ${
            selectedGenre === 'romance' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setSelectedGenre('romance')}
        >
          <Sparkles className="h-5 w-5" />
          <span>Romance</span>
        </button>
        <button
          className={`px-3 py-1 rounded-lg ${
            selectedGenre === 'mystery' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setSelectedGenre('mystery')}
        >
          <Sparkles className="h-5 w-5" />
          <span>Mystery</span>
        </button>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          ref={searchInputRef}
          placeholder="Search books..."
          className="border-gray-300 border p-2 rounded-md mr-2 w-full sm:w-auto"
        />
        <Button onClick={handleSearch}>
          <Search className="h-5 w-5 mr-1" />
          <span>Search</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
            <div onClick={() => showBookDetails(book)}>
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="w-full h-48 object-cover sm:h-64"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{book.volumeInfo.title}</h2>
                <p className="text-gray-600 mb-2">{book.volumeInfo.authors?.join(', ')}</p>
                <p className="text-gray-700">{book.volumeInfo.description?.substring(0, 150)}...</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedBook && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <div ref={selectedBookRef} className="bg-white rounded-lg shadow-md overflow-hidden p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={closeBookDetails}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold mb-4">{selectedBook.volumeInfo.title}</h2>
            <div className="flex mb-4">
              {selectedBook.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={selectedBook.volumeInfo.imageLinks.thumbnail}
                  alt={selectedBook.volumeInfo.title}
                  className="w-32 h-auto object-cover sm:w-48 sm:h-64 rounded-lg shadow-md"
                />
              )}
              <div className="ml-4 flex-1">
                <p className="text-gray-600 mb-2">{selectedBook.volumeInfo.authors?.join(', ')}</p>
                <p className="text-gray-700">{selectedBook.volumeInfo.description}</p>
                {selectedBook.accessInfo?.epub?.isAvailable && selectedBook.accessInfo.epub.acsTokenLink && (
                  <a
                    href={selectedBook.accessInfo.epub.acsTokenLink}
                    className="text-blue-500 hover:underline block mt-4"
                  >
                    Download EPUB
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
