'use client';

import { useState, useEffect } from 'react';
import { RecommendationCard } from './RecommendationCard';
import { BrandStoryCard } from './BrandStoryCard';
import { AudioPlayer } from './AudioPlayer';
import { SAMPLE_PRODUCTS, SAMPLE_BRANDS } from '@/lib/constants';
import type { Product, Brand } from '@/lib/types';

export function RecommendationFeed() {
  const [products] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [brands] = useState<Brand[]>(SAMPLE_BRANDS);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  const handleLike = (productId: string) => {
    console.log('Liked product:', productId);
    // TODO: Implement like functionality
  };

  const handleShare = (product: Product) => {
    console.log('Sharing product:', product);
    // TODO: Implement share functionality
  };

  return (
    <div className="py-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🎧</span>
        </div>
        <h2 className="text-white text-2xl font-bold">
          Discover Niche Products
        </h2>
        <p className="text-white/80 text-base leading-relaxed max-w-md mx-auto">
          Your AI audio guide to unique, handcrafted, and specialty items. 
          Listen to rich descriptions and brand stories.
        </p>
      </div>

      {/* Current Audio Player */}
      {currentAudio && (
        <div className="sticky top-20 z-40">
          <AudioPlayer
            audioUrl={currentAudio}
            title="Product Narration"
            variant="expanded"
            onPlayStateChange={(isPlaying) => {
              if (!isPlaying) {
                // Auto-hide after playback ends
                setTimeout(() => setCurrentAudio(null), 2000);
              }
            }}
          />
        </div>
      )}

      {/* Featured Brand Story */}
      <BrandStoryCard
        brand={brands[0]}
        onPlayAudio={(audioUrl) => setCurrentAudio(audioUrl)}
      />

      {/* Product Recommendations */}
      <div className="space-y-6">
        <h3 className="text-white text-xl font-semibold">
          Recommended for You
        </h3>
        
        {products.map((product, index) => (
          <RecommendationCard
            key={product.productId}
            product={product}
            variant="withAudio"
            onLike={handleLike}
            onShare={handleShare}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
          />
        ))}
      </div>

      {/* More Brand Stories */}
      <div className="space-y-4">
        <h3 className="text-white text-xl font-semibold">
          Brand Stories
        </h3>
        
        {brands.slice(1).map((brand) => (
          <BrandStoryCard
            key={brand.brandId}
            brand={brand}
            onPlayAudio={(audioUrl) => setCurrentAudio(audioUrl)}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-6">
        <button className="bg-white/20 text-white px-6 py-3 rounded-full hover:bg-white/30 transition-colors duration-200">
          Load More Recommendations
        </button>
      </div>
    </div>
  );
}
