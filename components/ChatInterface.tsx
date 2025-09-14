'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { cn, generateId } from '@/lib/utils';
import type { ChatMessage } from '@/lib/types';

interface ChatInterfaceProps {
  className?: string;
  onSendMessage?: (message: string) => void;
}

export function ChatInterface({ className, onSendMessage }: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    try {
      onSendMessage?.(userMessage);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording functionality
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={cn("sticky bottom-0 bg-white/10 backdrop-blur-md border-t border-white/20", className)}>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          {/* Voice Recording Button */}
          <button
            type="button"
            onClick={toggleRecording}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200",
              isRecording 
                ? "bg-red-500 text-white animate-pulse" 
                : "bg-white/20 text-white hover:bg-white/30"
            )}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about niche products..."
              className="w-full bg-white/20 text-white placeholder-white/60 rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
              disabled={isLoading || isRecording}
            />
            
            {/* Send Button */}
            <button
              type="submit"
              disabled={!message.trim() || isLoading || isRecording}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </form>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="mt-3 flex items-center justify-center space-x-2 text-white/80">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm">Recording... Tap mic to stop</span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            'Show me unique ceramics',
            'Find vintage vinyl',
            'Artisan jewelry recommendations',
            'Tell me about craft coffee'
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setMessage(suggestion)}
              className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs hover:bg-white/20 transition-colors duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
