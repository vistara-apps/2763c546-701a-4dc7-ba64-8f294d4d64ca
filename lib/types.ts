export interface User {
  userId: string;
  walletAddress: string;
  preferences: string[];
  interactionHistory: Interaction[];
}

export interface Product {
  productId: string;
  name: string;
  description: string;
  audioDescriptionUrl?: string;
  catalogId: string;
  brandId: string;
  imageUrl?: string;
  price?: number;
  category: string;
}

export interface Catalog {
  catalogId: string;
  name: string;
  niche: string;
  integrationType: string;
}

export interface Interaction {
  interactionId: string;
  userId: string;
  timestamp: Date;
  type: 'recommendation' | 'audio_play' | 'product_view' | 'voice_query';
  details: Record<string, any>;
}

export interface Brand {
  brandId: string;
  name: string;
  storyContent: string;
  logoUrl?: string;
  audioStoryUrl?: string;
}

export interface AudioState {
  isPlaying: boolean;
  currentTrack?: string;
  duration: number;
  currentTime: number;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioUrl?: string;
  products?: Product[];
}

export interface RecommendationRequest {
  query: string;
  userId?: string;
  context?: Record<string, any>;
}

export interface RecommendationResponse {
  products: Product[];
  audioNarration?: string;
  confidence: number;
}
