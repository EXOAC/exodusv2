import React, { useState } from 'react';
import { YouTubePlayer } from './YouTubePlayer';
import { YouTubeThumbnail } from './YouTubeThumbnail';
import { getYouTubeVideoId } from '../../utils/youtube';

interface YouTubeBlockProps {
  url: string;
  className?: string;
}

export function YouTubeBlock({ url, className = '' }: YouTubeBlockProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    return null;
  }

  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      {isPlaying ? (
        <YouTubePlayer videoId={videoId} />
      ) : (
        <YouTubeThumbnail 
          videoId={videoId} 
          onClick={() => setIsPlaying(true)} 
        />
      )}
    </div>
  );
}