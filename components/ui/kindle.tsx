import React, { useState } from 'react';
import { Home, Settings, ArrowLeft } from 'lucide-react';
import { Button } from './button';

const books = [
  { id: 1, name: 'The Fellowship of the Ring ', src: 'https://m.media-amazon.com/images/I/51HNV1J3UyL._SY445_SX342_.jpg' },
  { id: 2, name: 'Dune', src: 'https://m.media-amazon.com/images/I/41NUm7W1nNL._SY445_SX342_.jpg' },
  { id: 3, name: 'The Fall Of Gondolin', src: 'https://m.media-amazon.com/images/I/41SmaKys4+L._SY445_SX342_.jpg' },
  { id: 4, name: 'Atomic Habits', src: 'https://m.media-amazon.com/images/I/41C-012Es8L._SY445_SX342_.jpg' },
  { id: 5, name: 'Deep Work', src: 'https://m.media-amazon.com/images/I/91ZEUnFeUSL._SY445_SX342_.jpg' },
  { id: 6, name: 'The Almanack of Naval Ravikant', src: 'https://m.media-amazon.com/images/I/310TEThHyNL._SY445_SX342_.jpg' },
];

const Kindle: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [selectedBook, setSelectedBook] = useState<{ id: number; name: string; src: string } | null>(null);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
    setSelectedBook(null);
  };

  const handleBookClick = (book: { id: number; name: string; src: string }) => {
    setSelectedBook(book);
  };

  return (
    <div className="w-full sm:w-80 bg-gray-500 p-2 rounded-lg shadow-lg">
      <div className="bg-gray-900 p-4 border-t border-l border-r border-black rounded-t-2xl">
        <div className="bg-opacity-75 rounded-t-lg">
          <div className="flex mb-3 sm:flex-wrap">
            <Button
              className={`sm:flex-1 text-center p-2 flex items-center justify-center space-x-2  cursor-pointer`}
              onClick={() => handleTabClick(1)}
            >
              <Home />
              <span className="hidden sm:inline">Home</span>
            </Button>

            <Button
              className={`ml-2 sm:flex-1 text-center p-2 flex items-center justify-center space-x-2 cursor-pointer`}
              onClick={() => handleTabClick(1)}
            >
              <ArrowLeft />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </div>
        </div>

        <div className="p-4 h-96 flex flex-col justify-start items-center border-b ">
          {activeTab === 1 && !selectedBook && (
            <>
              <div className="text-center w-full mb-4">
                <h1 className="text-lg font-bold">Your Library</h1>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {books.slice(0, 3).map((book) => (
                    <img
                      key={book.id}
                      src={book.src}
                      alt={book.name}
                      className="h-24 w-16 object-cover rounded-md cursor-pointer"
                      onClick={() => handleBookClick(book)}
                    />
                  ))}
                </div>
              </div>
              <div className="text-center w-full">
               
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {books.slice(3).map((book) => (
                    <img
                      key={book.id}
                      src={book.src}
                      alt={book.name}
                      className="h-24 w-16 object-cover rounded-md cursor-pointer"
                      onClick={() => handleBookClick(book)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
          {activeTab === 1 && selectedBook && (
            <div className="text-center w-full  ">
              <h1 className="text-lg font-bold">{selectedBook.name}</h1>
              <img src={selectedBook.src} alt={selectedBook.name} className="h-72 w-auto object-cover rounded-md mt-4 ml-5" />
            </div>
          )}

        </div>
      </div>

      <div className="bg-gray-500 text-white text-center p-4 rounded-b-lg">
        <div className="text-xl font-semibold">Kindle</div>
      </div>
    </div>
  );
};

export default Kindle;
