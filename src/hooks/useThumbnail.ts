import { useState, useEffect } from 'react';
import { getThumbnailQualities } from '../utils/youtube';

export function useThumbnail(videoId: string) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBestThumbnail = async () => {
      setIsLoading(true);
      const qualities = getThumbnailQualities(videoId);
      
      // Set default thumbnail immediately
      setThumbnailUrl(qualities[2].url); // hqdefault as fallback

      for (const quality of qualities) {
        try {
          const response = await fetch(quality.url);
          if (response.ok) {
            const img = new Image();
            await new Promise((resolve, reject) => {
              img.onload = () => {
                if (img.naturalWidth > 120) {
                  resolve(quality.url);
                } else {
                  reject('Invalid thumbnail');
                }
              };
              img.onerror = () => reject('Failed to load');
              img.src = quality.url;
            });
            
            setThumbnailUrl(quality.url);
            break;
          }
        } catch (error) {
          continue;
        }
      }
      setIsLoading(false);
    };

    loadBestThumbnail();
  }, [videoId]);

  return { thumbnailUrl, isLoading };
}