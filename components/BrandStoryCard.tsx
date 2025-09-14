'use client';

import { useState } from 'react';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Brand } from '@/lib/types';

interface BrandStoryCardProps {
  brand: Brand;
  className?: string;
  onPlayAudio?: (audioUrl: string) => void;
}

export function BrandStoryCard({ brand, className, onPlayAudio }: BrandStoryCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayStory = () => {
    if (brand.audioStoryUrl) {
      onPlayAudio?.(brand.audioStoryUrl);
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={cn(
      "bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-4 shadow-card",
      className
    )}>
      {/* Brand Header */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
          {brand.logoUrl ? (
            <img 
              src={brand.logoUrl} 
              alt={brand.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold text-lg">
              {brand.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg">{brand.name}</h3>
          <p className="text-white/70 text-sm">Brand Story</p>
        </div>
        <button className="text-white/70 hover:text-white transition-colors duration-200">
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>

      {/* Story Content */}
      <div className="space-y-3">
        <p className="text-white/80 text-sm leading-relaxed">
          {brand.storyContent}
        </p>

        {/* Audio Story Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePlayStory}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors duration-200"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {isPlaying ? 'Pause Story' : 'Listen to Story'}
            </span>
          </button>

          <div className="flex items-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-1 h-4 bg-white/40 rounded-full",
                  isPlaying && "animate-pulse"
                )}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
