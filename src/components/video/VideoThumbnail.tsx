import React from 'react';
import { Play } from 'lucide-react';
import { useVideoThumbnail } from '../../hooks/useVideoThumbnail';

interface VideoThumbnailProps {
  videoId: string;
  onPlay: () => void;
  className?: string;
}

export function VideoThumbnail({ videoId, onPlay, className = '' }: VideoThumbnailProps) {
  const { thumbnailUrl, isLoading } = useVideoThumbnail(videoId);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          className={`
            w-full h-full object-cover
            transition-opacity duration-300
            ${isLoading ? 'opacity-0' : 'opacity-100'}
          `}
        />
      )}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <button
          onClick={onPlay}
          className="w-20 h-20 rounded-full bg-orange-500/90 flex items-center justify-center 
                     transition-all duration-300 hover:scale-110 hover:bg-orange-500
                     touch-feedback touch-target"
        >
          <Play className="w-8 h-8 text-white ml-1" />
        </button>
      </div>
    </div>
  );
}