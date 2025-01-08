import React from 'react';
import { Play } from 'lucide-react';
import { useThumbnail } from '../../hooks/useThumbnail';

interface YouTubeThumbnailProps {
  videoId: string;
  onClick: () => void;
}

export function YouTubeThumbnail({ videoId, onClick }: YouTubeThumbnailProps) {
  const { thumbnailUrl, isLoading } = useThumbnail(videoId);

  if (isLoading || !thumbnailUrl) {
    return (
      <div className="aspect-video w-full bg-black/20 animate-pulse" />
    );
  }

  return (
    <button 
      onClick={onClick}
      className="group relative w-full aspect-video bg-black overflow-hidden"
    >
      <img
        src={thumbnailUrl}
        alt="Video thumbnail"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 group-hover:bg-black/30">
        <div className="w-20 h-20 rounded-full bg-orange-500/90 flex items-center justify-center transition-all duration-300 group-hover:scale-110 hover:bg-orange-500">
          <Play className="w-8 h-8 text-white ml-1" />
        </div>
      </div>
    </button>
  );
}