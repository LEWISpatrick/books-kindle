import React, { useState } from 'react';
import { Home, Settings } from 'lucide-react';

const Kindle: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="w-full sm:w-80 bg-gray-500 p-2 rounded-lg shadow-lg">
      <div className="bg-gray-800 p-4 border-t border-l border-r border-black rounded-t-lg">
        <div className="bg-opacity-75 rounded-t-lg">
          <div className="flex mb-3 sm:flex-wrap">
            <div
              className={`sm:flex-1 text-center p-2 flex items-center justify-center space-x-2 ${
                activeTab === 1 ? 'bg-gray-700' : 'bg-gray-600'
              } cursor-pointer`}
              onClick={() => handleTabClick(1)}
            >
              <Home />
              <span className="hidden sm:inline">Home</span>
            </div>
          
            <div
              className={`sm:flex-1 text-center p-2 flex items-center justify-center space-x-2 ${
                activeTab === 2 ? 'bg-gray-700' : 'bg-gray-600'
              } cursor-pointer`}
              onClick={() => handleTabClick(2)}
            >
              <Settings />
              <span className="hidden sm:inline">Settings</span>
            </div>
          
          </div>
        </div>

        <div className="p-4 h-96 flex flex-col justify-start items-center border-b ">
          {activeTab === 1 && (
            <>
              <div className="text-center w-full mb-4">
                <h1 className="text-lg font-bold">Your Library</h1>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {/* Replace with your book images */}
                  <img
                    src="https://m.media-amazon.com/images/I/51HNV1J3UyL._SY445_SX342_.jpg"
                    alt="Book 1"
                    className="h-24 w-16 object-cover rounded-md cursor-pointer"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/41NUm7W1nNL._SY445_SX342_.jpg"
                    alt="Book 2"
                    className="h-24 w-16 object-cover rounded-md cursor-pointer"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/41SmaKys4+L._SY445_SX342_.jpg"
                    alt="Book 3"
                    className="h-24 w-16 object-cover rounded-md cursor-pointer"
                  />
                </div>
              </div>
              <div className="text-center w-full">
                <h1 className="text-lg font-bold">Your Reading Lists</h1>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {/* Replace with your book images */}
                  <img
                    src="https://m.media-amazon.com/images/I/41C-012Es8L._SY445_SX342_.jpg"
                    alt="Book 4"
                    className="h-24 w-16 object-cover rounded-md cursor-pointer"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/91ZEUnFeUSL._SY445_SX342_.jpg"
                    alt="Book 5"
                    className="h-24 w-16 object-cover rounded-md cursor-pointer"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/310TEThHyNL._SY445_SX342_.jpg"
                    alt="Book 6"
                    className="h-24 w-16 object-cover rounded-md cursor-pointer"
                  />
                </div>
              </div>
            </>
          )}
          {activeTab === 2 && (
            <div className="text-center w-full">
              <h1 className="text-lg font-bold">Settings</h1>
              {/* Replace with your settings UI */}
             
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
