import React from 'react';
import { MetaTags } from './MetaTags';
import { OpenGraph } from './OpenGraph';
import { TwitterCard } from './TwitterCard';
import { SchemaMarkup } from './SchemaMarkup';
import { SeoItem, SchemaData } from '../../types/seo';

interface SEOProps extends Omit<SeoItem, 'keywords'> {
  image?: string;
  url?: string;
  path?: string;
  keywords?: string | string[]; // Allow keywords to be a string or string[]
  schema?: SchemaData; // Ensure schema is optional
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [], // Default to an empty array
  schema = {}, // Default to an empty object
  image = 'https://imgur.com/iC4dzF4.png',
  url = 'https://exodus.fun',
  path = ''
}) => {
  const fullUrl = `${url}${path}`;

  return (
    <>
      <MetaTags
        title={title}
        description={description}
        keywords={typeof keywords === 'string' ? keywords.split(',') : keywords}
      />
      <OpenGraph
        title={title}
        description={description}
        image={image}
        url={fullUrl}
      />
      <TwitterCard
        title={title}
        description={description}
        image={image}
        url={fullUrl}
      />
      <SchemaMarkup schema={schema} />
    </>
  );
};
