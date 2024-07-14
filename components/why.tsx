'use client'
// src/why.js
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import YouTube from 'react-youtube';

const Why = () => {
  const videoOption = {
    height: '290',
     width:  '540',

    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
      mute: 0,
      loop: 1,
      start: 0,
    },
  };

  return (
    <section className="flex flex-col md:flex-row justify-center items-center py-8">
      {/* Left Column: Text Content */}
      <div className="w-full md:w-1/2 px-6 mb-4 md:mb-0">
        <h2 className="text-2xl font-bold mb-4">Why Books Kindle?</h2>
        <ul className="text-lg leading-relaxed">
          <li className="flex items-center mb-2">
            <FaCheckCircle className="text-green-500 mr-2" />
           Thousands of Free Books Available
          </li>
          <li className="flex items-center mb-2">
            <FaCheckCircle className="text-green-500 mr-2" />
            SOON:  Thousands of Free Audiobooks Available
          </li>
          <li className="flex items-center mb-2">
            <FaCheckCircle className="text-green-500 mr-2" />
            Lifetime updates
          </li>
          <li className="flex items-center mb-2">
            <FaCheckCircle className="text-green-500 mr-2" />
            Kindle Format PDF Converter
          </li>
        </ul>
      </div>

      {/* Right Column: Video */}
      <iframe
        id="youtube-iframe"
        src="https://www.youtube.com/embed/Q6jDdtbkMIU?si=YtgU89RhYiwt5-U5"
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className={`w-full max-w-xl max-h-72 aspect-video rounded-[32px] `}
      ></iframe>

    </section>
  );
};

export default Why;
