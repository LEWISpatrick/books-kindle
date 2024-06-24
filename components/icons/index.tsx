// components/icons/index.tsx
import React from 'react';

export const Icon = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  return <img src={src} alt={alt} className={className} />;
};
