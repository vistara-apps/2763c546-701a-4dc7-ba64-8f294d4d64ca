export const AUDIO_CATEGORIES = [
  'Artisan Ceramics',
  'Vintage Vinyl',
  'Handcrafted Jewelry',
  'Specialty Coffee',
  'Rare Books',
  'Custom Instruments',
  'Organic Skincare',
  'Craft Spirits',
] as const;

export const VOICE_STYLES = [
  { id: 'warm', name: 'Warm & Friendly', description: 'Perfect for lifestyle products' },
  { id: 'professional', name: 'Professional', description: 'Great for tech and business' },
  { id: 'storyteller', name: 'Storyteller', description: 'Ideal for artisan and craft items' },
  { id: 'energetic', name: 'Energetic', description: 'Best for sports and active products' },
] as const;

export const SAMPLE_PRODUCTS = [
  {
    productId: '1',
    name: 'Handcrafted Ceramic Mug',
    description: 'A beautiful, one-of-a-kind ceramic mug crafted by local artisans using traditional techniques.',
    catalogId: 'ceramics-1',
    brandId: 'artisan-pottery',
    imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
    price: 45,
    category: 'Artisan Ceramics',
  },
  {
    productId: '2',
    name: 'Vintage Jazz Vinyl Collection',
    description: 'Rare collection of 1960s jazz vinyl records in pristine condition.',
    catalogId: 'vinyl-1',
    brandId: 'vintage-sounds',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    price: 120,
    category: 'Vintage Vinyl',
  },
  {
    productId: '3',
    name: 'Artisan Silver Pendant',
    description: 'Hand-forged silver pendant with intricate Celtic knotwork design.',
    catalogId: 'jewelry-1',
    brandId: 'celtic-crafts',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    price: 85,
    category: 'Handcrafted Jewelry',
  },
] as const;

export const SAMPLE_BRANDS = [
  {
    brandId: 'artisan-pottery',
    name: 'Artisan Pottery Co.',
    storyContent: 'Founded in 1985 by master potter Sarah Chen, we create unique ceramic pieces that blend traditional techniques with modern aesthetics.',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=APC',
  },
  {
    brandId: 'vintage-sounds',
    name: 'Vintage Sounds',
    storyContent: 'Curating the finest vintage vinyl records for over 30 years, bringing the golden age of music to modern collectors.',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=VS',
  },
  {
    brandId: 'celtic-crafts',
    name: 'Celtic Crafts',
    storyContent: 'Preserving ancient Celtic metalworking traditions through contemporary jewelry design, each piece tells a story of heritage.',
    logoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=CC',
  },
] as const;

export const API_ENDPOINTS = {
  ELEVENLABS_TTS: 'https://api.elevenlabs.io/v1/text-to-speech',
  OPENAI_CHAT: 'https://api.openai.com/v1/chat/completions',
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 150,
  BASE: 250,
  SLOW: 400,
} as const;
