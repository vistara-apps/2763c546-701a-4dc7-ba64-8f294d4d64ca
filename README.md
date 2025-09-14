# AuraListen - AI Audio Shopping Assistant

AuraListen is a Base Mini App that serves as your AI audio guide to niche products. It provides personalized audio shopping recommendations and brand stories through voice, making niche product discovery more engaging and accessible.

## Features

- 🎧 **Audio Product Narrations**: Rich audio descriptions for specialized products
- 🗣️ **Voice-Guided Recommendations**: Personalized suggestions via natural voice interface
- 📖 **Brand Storytelling**: Audio snippets conveying brand ethos and creator stories
- 🛍️ **Niche Catalog Integration**: Seamless integration with specialized product catalogs
- 💬 **Conversational Interface**: Voice and text-based interaction with AI assistant

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via MiniKit)
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT for recommendations
- **Audio**: ElevenLabs Text-to-Speech
- **TypeScript**: Full type safety

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd auralisten
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `ELEVENLABS_API_KEY`: Your ElevenLabs API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # App providers
├── components/            # React components
│   ├── AppShell.tsx      # Main app layout
│   ├── AudioPlayer.tsx   # Audio playback component
│   ├── ChatInterface.tsx # Chat input interface
│   └── ...               # Other components
├── lib/                  # Utilities and types
│   ├── types.ts         # TypeScript definitions
│   ├── utils.ts         # Utility functions
│   └── constants.ts     # App constants
└── public/              # Static assets
```

## Key Components

### AppShell
Main application layout with header, navigation, and content area.

### AudioPlayer
Handles audio playback with controls, progress tracking, and waveform visualization.

### RecommendationCard
Displays product recommendations with audio descriptions and interaction buttons.

### ChatInterface
Voice and text input interface for user queries and interactions.

### BrandStoryCard
Showcases brand stories with audio narration capabilities.

## API Routes

- `/api/recommendations` - AI-powered product recommendations
- `/api/audio/generate` - Text-to-speech audio generation

## Base Mini App Integration

This app is built as a Base Mini App using:
- **MiniKit**: For Base blockchain integration
- **OnchainKit**: For wallet and identity features
- **Frame Actions**: Button presses and text inputs
- **Notifications**: For recommendation updates and brand stories

## Development

### Adding New Features

1. Define types in `lib/types.ts`
2. Create components in `components/`
3. Add API routes in `app/api/`
4. Update constants in `lib/constants.ts`

### Styling Guidelines

- Use Tailwind CSS classes
- Follow the design system tokens in `tailwind.config.js`
- Maintain mobile-first responsive design
- Use the purple gradient theme consistently

### Audio Integration

The app supports:
- Text-to-speech via ElevenLabs API
- Audio playback controls
- Waveform visualizations
- Voice input (planned)

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel (recommended)
   - Netlify
   - Railway
   - Custom server

3. **Configure environment variables** on your deployment platform

4. **Update manifest.json** with your production URLs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, please open an issue on GitHub or contact the development team.
