import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { SAMPLE_PRODUCTS } from '@/lib/constants';
import type { RecommendationRequest, RecommendationResponse } from '@/lib/types';

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }
  return new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
  });
};

export async function POST(request: NextRequest) {
  try {
    const body: RecommendationRequest = await request.json();
    const { query, userId, context } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Generate AI-powered recommendations
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are AuraListen, an AI audio shopping assistant specializing in niche products. 
          Analyze the user's query and recommend relevant products from our catalog. 
          Focus on unique, artisan, and specialty items. Provide engaging descriptions that would work well as audio narrations.
          
          Available categories: Artisan Ceramics, Vintage Vinyl, Handcrafted Jewelry, Specialty Coffee, Rare Books, Custom Instruments, Organic Skincare, Craft Spirits.`
        },
        {
          role: 'user',
          content: `User query: "${query}". Please recommend 2-3 relevant niche products and explain why they match the query.`
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content || '';

    // For MVP, return sample products with AI-enhanced descriptions
    const recommendedProducts = SAMPLE_PRODUCTS.slice(0, 2).map(product => ({
      ...product,
      description: `${product.description} ${aiResponse.includes(product.category) ? '(AI recommended based on your query)' : ''}`
    }));

    const response: RecommendationResponse = {
      products: recommendedProducts,
      audioNarration: `Based on your interest in "${query}", I've found some amazing niche products that I think you'll love. Let me tell you about them...`,
      confidence: 0.85
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Recommendation API error:', error);
    
    // Fallback to sample products if AI fails
    const fallbackResponse: RecommendationResponse = {
      products: SAMPLE_PRODUCTS.slice(0, 2),
      audioNarration: 'Here are some curated niche products I think you might enjoy.',
      confidence: 0.6
    };

    return NextResponse.json(fallbackResponse);
  }
}
