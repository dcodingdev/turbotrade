"use client";

import { useQuery } from "@tanstack/react-query";
import type { Conversation, ChatMessage } from "@repo/types";

async function fetchConversations(token: string): Promise<Conversation[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CHAT_SERVICE_URL}/api/chat/conversations`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch conversations");
  const json = await res.json();
  return json.data ?? [];
}

async function fetchMessages(conversationId: string, token: string): Promise<ChatMessage[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CHAT_SERVICE_URL}/api/chat/conversations/${conversationId}/messages`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch messages");
  const json = await res.json();
  return json.data ?? [];
}

export function useConversations(token: string) {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: () => fetchConversations(token),
    enabled: !!token,
    staleTime: 30_000,
  });
}

export function useMessages(conversationId: string, token: string) {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => fetchMessages(conversationId, token),
    enabled: !!conversationId && !!token,
    staleTime: 60_000,
  });
}
