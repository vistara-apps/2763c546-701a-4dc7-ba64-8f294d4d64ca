'use client';

import { useState } from 'react';
import { Heart, Share, ExternalLink } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';
import { cn, formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';

interface RecommendationCardProps {
  product: Product;
  variant?: 'withAudio' | 'textOnly';
  className?: string;
  onLike?: (productId: string) => void;
  onShare?: (product: Product) => void;
}

export function RecommendationCard({ 
  product, 
  variant = 'withAudio',
  className,
  onLike,
  onShare 
}: RecommendationCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(product.productId);
  };

  const handleShare = () => {
    onShare?.(product);
  };

  return (
    <div className={cn(
      "bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-card",
      className
    )}>
      {/* Product Image */}
      {product.imageUrl && (
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleLike}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200",
                isLiked 
                  ? "bg-red-500 text-white" 
                  : "bg-white/20 text-white hover:bg-white/30"
              )}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
            </button>
            <button
              onClick={handleShare}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
            >
              <Share className="w-4 h-4" />
            </button>
          </div>

          {/* Price Badge */}
          {product.price && (
            <div className="absolute bottom-4 left-4">
              <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                {formatPrice(product.price)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-white/80 text-sm leading-relaxed">{product.description}</p>
          
          {product.category && (
            <span className="inline-block mt-2 bg-white/20 text-white px-2 py-1 rounded-md text-xs">
              {product.category}
            </span>
          )}
        </div>

        {/* Audio Player */}
        {variant === 'withAudio' && (
          <AudioPlayer
            audioUrl={product.audioDescriptionUrl}
            title={`${product.name} - Audio Description`}
            variant="compact"
            onPlayStateChange={setIsPlaying}
          />
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center space-x-1 text-sm transition-colors duration-200",
                isLiked ? "text-red-400" : "text-white/70 hover:text-white"
              )}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
              <span>Like</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 text-white/70 hover:text-white text-sm transition-colors duration-200"
            >
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
          
          <button className="flex items-center space-x-1 text-white/70 hover:text-white text-sm transition-colors duration-200">
            <ExternalLink className="w-4 h-4" />
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  );
}
