import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { getYouTubeVideoId, getEmbedUrl, getThumbnailQualities } from '../../utils/youtube';

interface MediaGalleryProps {
  images: string[];
  className?: string;
}

export default function MediaGallery({ images, className = '' }: MediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadThumbnails = async () => {
      const newThumbnails: Record<string, string> = {};
      for (const url of images) {
        const videoId = getYouTubeVideoId(url);
        if (videoId) {
          const qualities = getThumbnailQualities(videoId);
          // Start with highest quality
          newThumbnails[url] = qualities[0].url;
          
          // Try to load each quality and use the first successful one
          for (const quality of qualities) {
            try {
              const response = await fetch(quality.url);
              if (response.ok) {
                newThumbnails[url] = quality.url;
                break;
              }
            } catch (error) {
              continue;
            }
          }
        } else {
          newThumbnails[url] = url;
        }
      }
      setThumbnails(newThumbnails);
    };

    loadThumbnails();
  }, [images]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsVideoPlaying(false);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsVideoPlaying(false);
  };

  const currentUrl = images[currentIndex];
  const currentYoutubeId = getYouTubeVideoId(currentUrl);
  const isCurrentItemVideo = Boolean(currentYoutubeId);

  return (
    <div className={`relative w-[85%] mx-auto ${className}`}>
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40">
        <div className="aspect-video">
          {isCurrentItemVideo ? (
            isVideoPlaying ? (
              <iframe
                width="100%"
                height="100%"
                src={getEmbedUrl(currentYoutubeId!, true)}
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={thumbnails[currentUrl] || `https://img.youtube.com/vi/${currentYoutubeId}/maxresdefault.jpg`}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-20 h-20 rounded-full bg-orange-500/90 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-orange-500"
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
              </div>
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
                    src={thumbnails[currentUrl] || currentUrl}
                    alt={`Screenshot ${currentIndex + 1}`}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Navigation arrows */}
          {images.length > 1 && !isVideoPlaying && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/90 hover:bg-black/70 hover:border-orange-500/30 transition-all duration-300 z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/90 hover:bg-black/70 hover:border-orange-500/30 transition-all duration-300 z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && !isVideoPlaying && (
        <div className="mt-4">
          <div className="flex gap-2 justify-center">
            {images.map((image, index) => {
              const youtubeId = getYouTubeVideoId(image);
              const thumbUrl = thumbnails[image] || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg` : image);
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsVideoPlaying(false);
                  }}
                  className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    currentIndex === index 
                      ? 'border-orange-500 scale-105' 
                      : 'border-white/10 hover:border-orange-500/50'
                  }`}
                >
                  <img
                    src={thumbUrl}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}