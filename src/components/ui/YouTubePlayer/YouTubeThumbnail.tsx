import React from 'react';
import { useThumbnail } from '../../../hooks/useThumbnail';

interface YouTubeThumbnailProps {
  videoId: string;
  className?: string;
}

export function YouTubeThumbnail({ videoId, className = '' }: YouTubeThumbnailProps) {
  const { thumbnailUrl, isLoading } = useThumbnail(videoId);

  if (isLoading || !thumbnailUrl) {
    return (
      <div className={`w-full h-full bg-black/20 ${className}`} />
    );
  }

  return (
    <img
      src={thumbnailUrl}
      alt="Video thumbnail"
      className={`w-full h-full object-cover transition-opacity duration-300 ${className}`}
    />
  );
}