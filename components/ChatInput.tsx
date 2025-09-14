'use client';

import { useState, useRef } from 'react';
import { Send, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  variant?: 'text' | 'voice';
  placeholder?: string;
  onSendMessage?: (message: string) => void;
  onVoiceInput?: (audioBlob: Blob) => void;
  disabled?: boolean;
  className?: string;
}

export function ChatInput({
  variant = 'text',
  placeholder = 'Type your message...',
  onSendMessage,
  onVoiceInput,
  disabled = false,
  className
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || disabled) return;

    onSendMessage?.(message.trim());
    setMessage('');
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // TODO: Implement actual voice recording
    } else {
      // Start recording
      setIsRecording(true);
      // TODO: Implement actual voice recording
    }
  };

  if (variant === 'voice') {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <button
          onClick={toggleRecording}
          disabled={disabled}
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200",
            isRecording
              ? "bg-red-500 text-white animate-pulse scale-110"
              : "bg-white/20 text-white hover:bg-white/30 hover:scale-105",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <Mic className="w-8 h-8" />
        </button>
        {isRecording && (
          <p className="ml-4 text-white/80 text-sm">
            Recording... Tap to stop
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex items-center space-x-2", className)}>
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-white/20 text-white placeholder-white/60 rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </form>
  );
}
