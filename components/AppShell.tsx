'use client';

import { ReactNode } from 'react';
import { UserAvatar } from './UserAvatar';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800",
      className
    )}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="w-full max-w-xl px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎧</span>
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg">AuraListen</h1>
                <p className="text-white/70 text-xs">Audio Enhanced AENRA</p>
              </div>
            </div>
            <UserAvatar />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-xl px-4 mx-auto">
        <div className="min-h-[calc(100vh-4rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}
