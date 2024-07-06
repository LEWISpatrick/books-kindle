import React, { useState } from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from './button';

const books = [
  { id: 1, name: 'The Fellowship of the Ring', src: 'https://m.media-amazon.com/images/I/51HNV1J3UyL._SY445_SX342_.jpg' },
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
    <div className="w-full sm:w-80 bg-foreground/5 p-2 rounded-xl shadow-lg">
      <div className="bg-white/50 dark:bg-black/25 p-4 rounded-t-lg">
        <div className="bg-opacity-75 rounded-t-lg">
          <div className="flex flex-col sm:flex-row mb-0 rounded-md overflow-hidden">
            <div
              className={`flex-1 text-center p-2 flex items-center justify-center space-x-2 ${
                activeTab === 1 ? 'bg-foreground/10' : 'bg-foreground/5'
              } cursor-pointer`}
              onClick={() => handleTabClick(1)}
            >
              <Home />
              <span className="sm:inline">Home</span>
            </div>

            <div
              className={`flex-1 text-center p-2 flex items-center justify-center space-x-2 ${
                activeTab === 2 ? 'bg-foreground/10' : 'bg-foreground/5'
              } cursor-pointer`}
              onClick={() => handleTabClick(1)}
            >
              <ArrowLeft />
              <span className="sm:inline">Back</span>
            </div>
          </div>
        </div>

        <div className="p-4 h-full flex flex-col justify-start items-center border-b ">
          {activeTab === 1 && !selectedBook && (
            <>
              <div className="text-center w-full">
                <h1 className="text-lg font-bold mb-2">Your Library</h1>
                <div className="grid grid-cols-3 gap-4">
                  {books.map((book) => (
                    <div
                      key={book.id}
                      className="w-full aspect-[2/3] object-cover rounded-md cursor-pointer overflow-hidden"
                      onClick={() => handleBookClick(book)}
                    >
                      <img
                        src={book.src}
                        alt={book.name}
                        className="w-full hover:scale-105 transition duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {activeTab === 1 && selectedBook && (
            <div className="flex flex-col items-center text-center w-full">
              <h1 className="text-lg font-bold">{selectedBook.name}</h1>
              <img src={selectedBook.src} alt={selectedBook.name} className="h-72 w-auto object-cover rounded-md mt-2" />
              <Button
              className='mt-4'
              >Download Pdf</Button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-foreground/5 text-foreground text-center p-4 rounded-b-lg">
        <div className="text-xl font-semibold">Kindle</div>
      </div>
    </div>
  );
};

export default Kindle;
