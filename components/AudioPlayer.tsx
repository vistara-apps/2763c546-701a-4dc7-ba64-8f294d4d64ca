'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { cn, formatTime } from '@/lib/utils';
import type { AudioState } from '@/lib/types';

interface AudioPlayerProps {
  audioUrl?: string;
  title?: string;
  variant?: 'compact' | 'expanded';
  className?: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export function AudioPlayer({ 
  audioUrl, 
  title = 'Audio Track',
  variant = 'expanded',
  className,
  onPlayStateChange 
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    duration: 0,
    currentTime: 0,
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setAudioState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
      }));
    };

    const handleLoadedMetadata = () => {
      setAudioState(prev => ({
        ...prev,
        duration: audio.duration,
      }));
    };

    const handleEnded = () => {
      setAudioState(prev => ({ ...prev, isPlaying: false }));
      onPlayStateChange?.(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onPlayStateChange]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    try {
      if (audioState.isPlaying) {
        audio.pause();
        setAudioState(prev => ({ ...prev, isPlaying: false }));
        onPlayStateChange?.(false);
      } else {
        await audio.play();
        setAudioState(prev => ({ ...prev, isPlaying: true }));
        onPlayStateChange?.(true);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setAudioState(prev => ({ ...prev, currentTime: newTime }));
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.max(0, Math.min(audioState.duration, audioState.currentTime + seconds));
    audio.currentTime = newTime;
    setAudioState(prev => ({ ...prev, currentTime: newTime }));
  };

  if (variant === 'compact') {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <button
          onClick={togglePlayPause}
          disabled={!audioUrl}
          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200 disabled:opacity-50"
        >
          {audioState.isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white ml-0.5" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{title}</p>
          <p className="text-white/70 text-xs">
            {formatTime(audioState.currentTime)} / {formatTime(audioState.duration)}
          </p>
        </div>
        {audioUrl && (
          <audio ref={audioRef} src={audioUrl} preload="metadata" />
        )}
      </div>
    );
  }

  return (
    <div className={cn("bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-4", className)}>
      <div className="text-center">
        <h3 className="text-white font-medium text-lg mb-1">{title}</h3>
        <p className="text-white/70 text-sm">Audio narration</p>
      </div>

      {/* Waveform Visualization */}
      <div className="flex items-center justify-center space-x-1 h-12">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-1 bg-white/40 rounded-full transition-all duration-200",
              audioState.isPlaying ? "audio-wave" : "h-2"
            )}
            style={{
              animationDelay: `${i * 0.05}s`,
              height: audioState.isPlaying ? undefined : '8px',
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max={audioState.duration || 0}
          value={audioState.currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          disabled={!audioUrl}
        />
        <div className="flex justify-between text-white/70 text-xs">
          <span>{formatTime(audioState.currentTime)}</span>
          <span>{formatTime(audioState.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => skip(-10)}
          disabled={!audioUrl}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200 disabled:opacity-50"
        >
          <SkipBack className="w-5 h-5 text-white" />
        </button>
        
        <button
          onClick={togglePlayPause}
          disabled={!audioUrl}
          className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors duration-200 disabled:opacity-50"
        >
          {audioState.isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-0.5" />
          )}
        </button>
        
        <button
          onClick={() => skip(10)}
          disabled={!audioUrl}
          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200 disabled:opacity-50"
        >
          <SkipForward className="w-5 h-5 text-white" />
        </button>
      </div>

      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
      )}
    </div>
  );
}
