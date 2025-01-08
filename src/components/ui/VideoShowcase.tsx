import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { VideoShowcase as VideoShowcaseType } from '../../types/video';
import { getVideoMetadata } from '../../utils/videoUtils';

interface VideoShowcaseProps {
  video: VideoShowcaseType;
  index: number;
}

export default function VideoShowcase({ video, index }: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const metadata = getVideoMetadata(video.source, video.videoId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <div
        ref={boxRef}
        className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-orange-500/30"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Lightning effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: isHovered
              ? `
                radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.06), transparent 40%),
                radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.08), transparent 40%),
                radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.12), transparent 40%),
                radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.15), transparent 40%)
              `
              : '',
          }}
        />

        <div className="aspect-video relative">
          {isPlaying ? (
            <iframe
              src={metadata.embedUrl}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <>
              <img
                src={video.thumbnailUrl || metadata.thumbnailUrl}
                alt={video.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-orange-500/90 hover:bg-orange-500 transition-all duration-300 flex items-center justify-center group-hover:scale-110"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>
            </>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-medium text-white/90 mb-2 group-hover:text-orange-500 transition-colors duration-300">
            {video.title}
          </h3>
          <p className="text-white/60 group-hover:text-white/70 transition-colors duration-300">
            {video.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}