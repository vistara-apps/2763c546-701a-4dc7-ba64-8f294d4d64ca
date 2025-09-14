'use client';

import { AppShell } from '@/components/AppShell';
import { ChatInterface } from '@/components/ChatInterface';
import { RecommendationFeed } from '@/components/RecommendationFeed';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <RecommendationFeed />
        </div>
        <ChatInterface />
      </div>
    </AppShell>
  );
}
