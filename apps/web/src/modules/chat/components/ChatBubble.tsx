"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatWindow } from "./ChatWindow";

interface ChatBubbleProps {
  conversationId?: string;
  token?: string;
  currentUserId?: string;
}

export function ChatBubble({
  conversationId,
  token,
  currentUserId,
}: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Don't render if there's no active conversation or user
  if (!conversationId || !token || !currentUserId) return null;

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl",
          "bg-violet-600 hover:bg-violet-700 text-white",
          "transition-all duration-200"
        )}
        size="icon"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </Button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-80 h-[480px] rounded-2xl overflow-hidden",
          "border border-border shadow-2xl bg-card",
          "transition-all duration-300 ease-out",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-semibold text-foreground">
            Support Chat
          </span>
        </div>

        {/* Window */}
        <div className="h-[calc(100%-53px)]">
          <ChatWindow
            conversationId={conversationId}
            token={token}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    </>
  );
}
