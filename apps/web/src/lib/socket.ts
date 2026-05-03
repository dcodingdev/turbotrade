"use client";

import { io, Socket } from "socket.io-client";
import type {
  SocketServerToClientEvents,
  SocketClientToServerEvents,
} from "@repo/types";

export type TypedClientSocket = Socket<
  SocketServerToClientEvents,
  SocketClientToServerEvents
>;

let socket: TypedClientSocket | null = null;

export function getSocket(token?: string): TypedClientSocket {
  if (!socket || !socket.connected) {
    socket = io(
      process.env.NEXT_PUBLIC_CHAT_SERVICE_URL || "http://localhost:4006",
      {
        auth: { token: token || "" },
        transports: ["websocket", "polling"],
        autoConnect: false, // Controlled connection lifecycle
      }
    );
  }
  return socket;
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
