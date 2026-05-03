import logger from "@repo/logger";
import { messageService } from "@/modules/message/message.service";
import type { TypedSocket, TypedServer } from "./socket.types";

export function registerSocketHandlers(io: TypedServer, socket: TypedSocket): void {
  const user = socket.data.user;
  logger.info({ userId: user._id }, `Socket connected: ${socket.id}`);

  // Join personal notification room on connect
  socket.join(`user:${user._id}`);

  // --- Room Management ---
  socket.on("join_room", ({ conversationId }) => {
    socket.join(conversationId);
    logger.info({ userId: user._id, conversationId }, "User joined room");
  });

  socket.on("leave_room", ({ conversationId }) => {
    socket.leave(conversationId);
    logger.info({ userId: user._id, conversationId }, "User left room");
  });

  // --- Messaging ---
  socket.on("send_message", async ({ conversationId, body }) => {
    try {
      if (!body?.trim()) {
        socket.emit("error", "Message body cannot be empty");
        return;
      }

      const message = await messageService.createMessage(
        conversationId,
        user._id,
        body.trim()
      );

      // Broadcast to all participants in the room (including sender)
      io.to(conversationId).emit("new_message", {
        _id: message._id,
        conversationId: message.conversationId,
        senderId: message.senderId,
        body: message.body,
        createdAt: message.createdAt,
      });

      logger.info({ conversationId, senderId: user._id }, "Message sent via socket");
    } catch (err) {
      logger.error({ err }, "Failed to send message via socket");
      socket.emit("error", "Failed to send message. Please try again.");
    }
  });

  // --- Typing Indicators ---
  socket.on("typing", ({ conversationId }) => {
    socket.to(conversationId).emit("user_typing", {
      conversationId,
      userId: user._id,
    });
  });

  socket.on("stop_typing", ({ conversationId }) => {
    socket.to(conversationId).emit("user_stopped_typing", {
      conversationId,
      userId: user._id,
    });
  });

  // --- Read Receipts ---
  socket.on("mark_read", ({ conversationId, messageId }) => {
    socket.to(conversationId).emit("message_read", {
      conversationId,
      messageId,
      userId: user._id,
    });
  });

  // --- Disconnect ---
  socket.on("disconnect", (reason) => {
    logger.info({ userId: user._id, reason }, "Socket disconnected");
  });
}
