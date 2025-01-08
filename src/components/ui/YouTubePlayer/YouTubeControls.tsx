import React from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { formatDuration } from '../../../utils/youtube';
import type { YouTubePlayerState } from '../../../types/youtube';

interface YouTubeControlsProps {
  state: YouTubePlayerState;
  onPlay: () => void;
  onPause: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
}

export function YouTubeControls({
  state,
  onPlay,
  onPause,
  onVolumeChange,
  onSeek
}: YouTubeControlsProps) {
  const { isPlaying, currentTime, duration } = state;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <div className="flex items-center gap-4">
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="text-white hover:text-orange-500 transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <span className="text-white text-sm">
          {formatDuration(currentTime)} / {formatDuration(duration)}
        </span>
      </div>
    </div>
  );
}