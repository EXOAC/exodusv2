import { isValidImgurUrl } from './productImages';

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  id?: string;
}

export function validateMediaUrl(url: string): MediaItem | null {
  // YouTube URL patterns
  const youtubePatterns = [
    /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /^https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/
  ];

  // Check for YouTube URLs
  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return {
        type: 'video',
        url: url,
        id: match[1]
      };
    }
  }

  // Check for Imgur URLs
  if (isValidImgurUrl(url)) {
    return {
      type: 'image',
      url: url
    };
  }

  // Check if it's a direct YouTube video ID
  if (url.startsWith('https://youtu.be/')) {
    const id = url.split('/').pop();
    return {
      type: 'video',
      url: `https://youtube.com/watch?v=${id}`,
      id
    };
  }

  return null;
}

export function extractYoutubeId(url: string): string | null {
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1];
  }
  
  const mediaItem = validateMediaUrl(url);
  return mediaItem?.type === 'video' ? mediaItem.id || null : null;
}