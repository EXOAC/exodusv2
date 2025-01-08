import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getYouTubeVideoId, getEmbedUrl } from '../../utils/youtube';
import { VideoThumbnail } from './VideoThumbnail';

interface MediaItem {
  type: 'video' | 'image';
  url: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
  className?: string;
}

export function MediaGallery({ items, className = '' }: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const currentItem = items[currentIndex];
  const isVideo = currentItem?.type === 'video';
  const videoId = isVideo ? getYouTubeVideoId(currentItem.url) : null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsVideoPlaying(false);
    setImageLoaded(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsVideoPlaying(false);
    setImageLoaded(false);
  };

  if (!items?.length) return null;

  return (
    <div className={`relative w-full mx-auto ${className}`}>
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40">
        <div className="aspect-video">
          {isVideo && videoId ? (
            isVideoPlaying ? (
              <iframe
                width="100%"
                height="100%"
                src={getEmbedUrl(videoId, true)}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <VideoThumbnail
                videoId={videoId}
                onPlay={() => setIsVideoPlaying(true)}
              />
            )
          ) : (
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentItem?.url}
                    alt={`Media ${currentIndex + 1}`}
                    onLoad={() => setImageLoaded(true)}
                    className={`
                      w-full h-full object-cover
                      transition-opacity duration-300
                      ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                    `}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Navigation arrows */}
          {items.length > 1 && !isVideoPlaying && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                           bg-black/50 backdrop-blur-sm border border-white/10 
                           text-white/90 hover:bg-black/70 hover:border-orange-500/30 
                           transition-all duration-300 z-10 touch-target touch-feedback"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                           bg-black/50 backdrop-blur-sm border border-white/10 
                           text-white/90 hover:bg-black/70 hover:border-orange-500/30 
                           transition-all duration-300 z-10 touch-target touch-feedback"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}