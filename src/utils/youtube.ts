export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // Handle youtu.be URLs
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split(/[?#]/)[0];
    return id || null;
  }
  
  // Handle youtube.com URLs
  const regexPatterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
    /^[a-zA-Z0-9_-]{11}$/
  ];

  for (const regex of regexPatterns) {
    const match = url.match(regex);
    if (match) return match[1];
  }

  return null;
}

export function getThumbnailQualities(videoId: string): Array<{ width: number; url: string }> {
  if (!videoId) return [];
  
  return [
    { width: 480, url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
    { width: 320, url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
    { width: 120, url: `https://img.youtube.com/vi/${videoId}/default.jpg` }
  ];
}

export function getEmbedUrl(videoId: string, autoplay: boolean = false): string {
  if (!videoId) return '';
  
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    showinfo: '0',
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1'
  });
  
  return `https://www.youtube.com/embed/${videoId}?${params}`;
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}