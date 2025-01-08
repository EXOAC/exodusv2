import React from 'react';

interface VideoPlayerProps {
  videoId: string;
  isPlaying: boolean;
  onPlay: () => void;
}

export default function VideoPlayer({ videoId, isPlaying, onPlay }: VideoPlayerProps) {
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
      {isPlaying ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Video Preview"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0"
        />
      ) : (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <button 
            onClick={onPlay}
            className="w-20 h-20 rounded-full bg-orange-500/90 hover:bg-orange-500 transition-all duration-300 flex items-center justify-center group-hover:scale-110"
          >
            <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2" />
          </button>
        </div>
      )}
    </div>
  );
}