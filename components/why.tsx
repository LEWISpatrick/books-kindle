// src/why.js
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Why = () => {
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
            Thousands of Free Audiobooks Available
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
      <div className="w-full md:w-1/2 px-6">
        {/* Replace the src value with your actual video URL */}
        <iframe
          className="w-full h-64 md:h-full"
          src="https://www.youtube.com/embed/VIDEO_ID_HERE"
          title="Why Books Kindle Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default Why;
