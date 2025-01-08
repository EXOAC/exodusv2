import React, { useState } from 'react';

interface CardImageProps {
  src: string;
  alt: string;
}

export default function CardImage({ src, alt }: CardImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent z-10" />
      <div 
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`} 
      />
      <img
        src={src}
        alt={`${alt} Interface`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={(e) => {
          console.error('Image failed to load:', src);
          e.currentTarget.src = 'https://i.imgur.com/Ql4jRdx.png';
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}