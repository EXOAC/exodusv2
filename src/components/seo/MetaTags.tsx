import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords: string[];
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  keywords,
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords.join(', ')} />
    
    {/* Core Meta Tags */}
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="yandex" content="index, follow" />
    <meta name="revisit-after" content="1 days" />
    <meta name="language" content="English" />
    
    {/* Additional Meta Tags */}
    <meta name="rating" content="general" />
    <meta name="distribution" content="global" />
    <meta name="coverage" content="Worldwide" />
    <meta name="target" content="all" />
    <meta name="HandheldFriendly" content="True" />
    <meta name="author" content="EXODUS" />
    <meta name="copyright" content="EXODUS" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="theme-color" content="#f97316" />
    
    {/* Mobile Optimization */}
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="apple-mobile-web-app-title" content={title} />
    
    {/* Preconnect to Required Origins */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://imgur.com" />
    
    {/* Canonical URL */}
    <link rel="canonical" href="https://exodus.fun" />
  </Helmet>
);