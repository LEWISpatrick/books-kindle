import React from 'react';
import { Card, CardHeader } from './ui/card';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Repeat from '@/public/repeat.png';
import MobileRepeat from '@/public/mobile-repeat.png';

export const Tired = () => {
  const cardStyle = {
    backgroundColor: '#121212',
    border: '1px solid gray',
    borderColor: 'gray',
  };

  return (
    <div className="mx-auto px-4 py-10 md:px-20 md:py-20">
      <h2 className="text-center font-extrabold text-3xl md:text-5xl tracking-tight mb-8 md:mb-20">Tired of Purchasing Overpriced Books?</h2>

      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        <Card style={cardStyle} className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl flex flex-col items-center justify-center w-full md:w-[335px] h-[300px] text-center">
          <div className="p-4 text-center transform scale-x-[-1]">
            <span className="text-6xl md:text-8xl">🛍️</span>
          </div>
          <CardHeader>
            <h2 className="text-lg md:text-xl font-bold">Buy the Kindle Book</h2>
            <p>Buy the <span className="underline">Hobit</span> for <span className="text-red-500">$14.99</span></p>
          </CardHeader>
        </Card> 
        <MoveRight className="hidden md:block" />
        <Card style={cardStyle} className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl flex flex-col items-center justify-center w-full md:w-[335px] h-[300px] text-center">
          <div className="p-4 text-center">
            <span className="text-6xl md:text-8xl">🎯</span>
          </div>
          <CardHeader>
            <h2 className="text-lg md:text-xl font-bold">📚 Start Reading 📚</h2>
            <p>Start Reading the <span className="underline">Hobit</span></p>
          </CardHeader>
        </Card>
        <MoveRight className="hidden md:block" />
        <Card style={cardStyle} className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl flex flex-col items-center justify-center w-full md:w-[335px] h-[300px] text-center">
          <div className="p-4 text-center transform scale-x-[-1]">
            <span className="text-6xl md:text-8xl">😔</span>
          </div>
          <CardHeader>
            <h2 className="text-lg md:text-xl font-bold">Didn't like the <span className="underline">Hobit</span></h2>
            <p className="flex items-center justify-center">
              <span className="text-red-500 ml-1">End up Wasting $14.99</span>
            </p>
          </CardHeader>
        </Card>
      </div>
     
    </div>
  );
};
