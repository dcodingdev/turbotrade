import { randomUUID } from 'node:crypto';
import { MessageModel } from './message.model';
import { conversationService } from '../conversation/conversation.service';

export const messageService = {
    async createMessage(conversationId: string, senderId: string, body: string) {
        const message = await MessageModel.create({
            _id: randomUUID(),
            conversationId,
            senderId,
            body,
        });

        await conversationService.touchConversation(conversationId, body);

        return message;
    },

    async listMessages(conversationId: string, userId: string, options: { limit?: number; after?: Date } = {}) {
        const query: any = { conversationId };
        
        if (options.after) {
            query.createdAt = { $gt: options.after };
        }

        const results = await MessageModel.find(query)
            .sort({ createdAt: 1 })
            .limit(options.limit || 50);

        return results;
    }
};
