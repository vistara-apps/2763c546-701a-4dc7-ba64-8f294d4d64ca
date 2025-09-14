'use client';

import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  className?: string;
}

export function UserAvatar({ className }: UserAvatarProps) {
  // Only use MiniKit in browser environment
  const { context } = typeof window !== 'undefined' ? useMiniKit() : { context: null };

  // Handle build-time when MiniKit is not available
  if (!context) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
          <span className="text-white text-sm font-medium">U</span>
        </div>
        <span className="text-white text-sm font-medium hidden sm:block">User</span>
      </div>
    );
  }

  const displayName = context?.user?.displayName || 'User';
  const avatarUrl = context?.user?.pfpUrl;

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={displayName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-sm font-medium">
            {displayName.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <span className="text-white text-sm font-medium hidden sm:block">
        {displayName}
      </span>
    </div>
  );
}
