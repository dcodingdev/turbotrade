"use client";

import { useState } from "react";
import { ConversationList } from "@/modules/chat/components/ConversationList";
import { ChatWindow } from "@/modules/chat/components/ChatWindow";
import { useConversations } from "@/hooks/useConversations";
import { MessageSquare } from "lucide-react";

// TODO: Replace with real auth token from session store
const MOCK_TOKEN = "";
const MOCK_USER_ID = "";

export default function VendorChatPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const { data: conversations = [], isLoading } = useConversations(MOCK_TOKEN);

  return (
    <div className="flex h-[calc(100vh-64px)] -m-8 overflow-hidden border border-border rounded-xl">
      {/* Left panel: Conversation List */}
      <div className="w-80 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-violet-400" />
            <h1 className="text-base font-semibold text-foreground">Messages</h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversationId ?? undefined}
            onSelect={setSelectedConversationId}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Right panel: Message Window */}
      <div className="flex-1 flex flex-col bg-background">
        {selectedConversationId ? (
          <ChatWindow
            conversationId={selectedConversationId}
            token={MOCK_TOKEN}
            currentUserId={MOCK_USER_ID}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground/40" />
            <h2 className="text-base font-semibold text-foreground">
              Select a conversation
            </h2>
            <p className="text-sm text-muted-foreground">
              Choose a conversation from the list to start messaging.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
