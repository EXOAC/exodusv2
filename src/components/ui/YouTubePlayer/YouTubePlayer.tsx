import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { getEmbedUrl } from '../../../utils/youtube';
import { YouTubeThumbnail } from './YouTubeThumbnail';

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  className?: string;
}

export function YouTubePlayer({ videoId, title, className = '' }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className={`aspect-video rounded-2xl overflow-hidden ${className}`}>
        <iframe
          width="100%"
          height="100%"
          src={getEmbedUrl(videoId, true)}
          title={title || 'YouTube Video'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative aspect-video rounded-2xl overflow-hidden ${className}`}>
      <YouTubeThumbnail videoId={videoId} />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <button
          onClick={() => setIsPlaying(true)}
          className="w-20 h-20 rounded-full bg-orange-500/90 hover:bg-orange-500 transition-all duration-300 flex items-center justify-center group hover:scale-110"
        >
          <Play className="w-8 h-8 text-white ml-1" />
        </button>
      </div>
    </div>
  );
}