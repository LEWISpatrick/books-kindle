'use client'
// src/Carousel.js
import React from 'react';
import Marquee from 'react-marquee-slider';

const images = [
  'https://i.ibb.co/XbCbyDs/dgvca55-4f327592-7d41-4c33-98e1-6f401c308059-removebg-preview.png',
  'https://i.ibb.co/rfmMHKL/Logo-Der-Hobbit-Die-Schlacht-der-Fu-nf-Heere-removebg-preview-1.png',
  'https://i.ibb.co/M2hvZbN/Harry-Potter-Logo-2001-removebg-preview.png',
  // 'https://i.ibb.co/M2VFZxh/images-removebg-preview.png',
  // 'https://i.ibb.co/pdGb5Xp/images-removebg-preview-1.png',
  // 'https://i.ibb.co/nLMNr4G/Percy-jackson-and-the-olympians-logo-removebg-preview.png',
  // Add more image URLs as needed
];

const Carousel = () => {
  return (
    <section className="relative h-64 overflow-hidden">
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r pointer-events-none z-10"></div>
      <div className=" space-x-4 p-4 shadow-lg absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l pointer-events-none z-10"></div>
      <Marquee 
        velocity={100} 
        direction="ltr" 
        scatterRandomly={false} 
        resetAfterTries={200} 
        onInit={() => {}} 
        onFinish={() => {}}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i}`}
            className="w-96 h-auto transition-opacity duration-300 opacity-75 hover:opacity-100 rounded-lg"
          />
        ))}
      </Marquee>
    </section>
  );
};

export default Carousel;
