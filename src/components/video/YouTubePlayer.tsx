import React from 'react';
import { getEmbedUrl } from '../../utils/youtube';

interface YouTubePlayerProps {
  videoId: string;
}

export function YouTubePlayer({ videoId }: YouTubePlayerProps) {
  return (
    <div className="aspect-video w-full">
      <iframe
        className="w-full h-full"
        src={getEmbedUrl(videoId, true)}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}