import { useState, useEffect } from 'react';
import { getThumbnailQualities } from '../utils/youtube';

export function useVideoThumbnail(videoId: string | null) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!videoId) {
      setIsLoading(false);
      return;
    }

    const loadThumbnail = async () => {
      setIsLoading(true);
      
      // Start with default quality as fallback
      const defaultUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      setThumbnailUrl(defaultUrl);

      try {
        const qualities = getThumbnailQualities(videoId);
        
        // Create an image element to test loading
        const testImage = (url: string): Promise<boolean> => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
          });
        };

        // Try loading thumbnails in order of quality
        for (const quality of qualities) {
          const success = await testImage(quality.url);
          if (success) {
            setThumbnailUrl(quality.url);
            break;
          }
        }
      } catch (error) {
        console.warn('Failed to load high quality thumbnail, using default');
      } finally {
        setIsLoading(false);
      }
    };

    loadThumbnail();
  }, [videoId]);

  return { thumbnailUrl, isLoading };
}