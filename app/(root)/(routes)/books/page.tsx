'use client'
import { useState, useEffect } from 'react';
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
    previewLink?: string;
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

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('fiction'); // Default genre

  useEffect(() => {
    fetchBooks(selectedGenre);
  }, [selectedGenre]);

  const fetchBooks = (genre: string) => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&key=${GOOGLE_BOOKS_API_KEY}`)
      .then(response => {
        setBooks(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSearch = () => {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${GOOGLE_BOOKS_API_KEY}`)
      .then(response => {
        setBooks(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <div className="flex mb-4 space-x-4">
        <button
          className={` px-3 py-1 rounded-lg ${selectedGenre === 'fiction' ? '' : ''}`}
          onClick={() => setSelectedGenre('fiction')}
        >
          <Button className="gap-2">
                <Sparkles className="h-5 w-5" />
                <span>Fiction</span>
              </Button>
          
        </button>
        <button
          className={` px-3 py-1 rounded-lg ${selectedGenre === 'drama' ? '' : ''}`}
          onClick={() => setSelectedGenre('drama')}
        >
                  <Button className="gap-2">
                <Sparkles className="h-5 w-5" />
                <span>Drama</span>
              </Button>
        </button>
        <button
          className={` px-3 py-1 rounded-lg ${selectedGenre === 'romance' ? '' : ''}`}
          onClick={() => setSelectedGenre('romance')}
        >
                  <Button className="gap-2">
                <Sparkles className="h-5 w-5" />
                <span>Romance</span>
              </Button>
        </button>
        <button
          className={`px-3 py-1 rounded-lg ${selectedGenre === 'mystery' ? '' : ''}`}
          onClick={() => setSelectedGenre('mystery')}
        >
          
          <Button className="gap-2">
                <Sparkles className="h-5 w-5" />
                <span>Mystery</span>
              </Button>
        </button>
        {/* Add more genre buttons as needed */}
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Count of Monte Cristo..."
          className="border-gray-300 border p-2 rounded-md mr-2"
        />
        <Button
          onClick={handleSearch}
         
        >
          <Search/>
          <span> Search</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => {
          const { id, volumeInfo, accessInfo } = book;
          return (
            <div key={id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {volumeInfo.imageLinks?.thumbnail && (
                <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{volumeInfo.title}</h2>
                <p className="text-gray-600 mb-4">{volumeInfo.authors?.join(', ')}</p>
                <p className="text-gray-700">{volumeInfo.description?.substring(0, 100)}...</p>
                {volumeInfo.previewLink && (
                  <a href={volumeInfo.previewLink} className="text-blue-500 hover:underline">
                    Preview
                  </a>
                )}
                {accessInfo?.epub?.isAvailable && (
                  <a href={accessInfo.epub.acsTokenLink} className="text-blue-500 hover:underline">
                    Download EPUB
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
