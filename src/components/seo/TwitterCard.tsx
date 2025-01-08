import React from 'react';

interface TwitterCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const TwitterCard: React.FC<TwitterCardProps> = ({ title, description, image, url }) => {
  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
    </>
  );
};
