export interface ThumbnailQuality {
  width: number;
  url: string;
}

export interface YouTubePlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  quality: string;
}