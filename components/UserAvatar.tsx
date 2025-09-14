'use client';

import { useMiniKit } from '@coinbase/minikit';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  className?: string;
}

export function UserAvatar({ className }: UserAvatarProps) {
  const { user } = useMiniKit();

  const displayName = user?.displayName || 'User';
  const avatarUrl = user?.pfpUrl;

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
