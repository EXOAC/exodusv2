import React from 'react';

interface OpenGraphProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const OpenGraph: React.FC<OpenGraphProps> = ({ title, description, image, url }) => {
  return (
    <>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
    </>
  );
};
