import { randomUUID } from 'node:crypto';
import { HttpError } from '@repo/common';

import type {
    Conversation,
    ConversationFilter,
    ConversationSummary,
    CreateConversationInput,
} from '@/types/conversation.types';

import { ConversationModel } from './conversation.model';
import { conversationCache } from './conversation.cache';
import { MessageModel } from '../message/message.model';

// --- Private Mapper ---
const toConversation = (doc: any): Conversation => ({
    id: String(doc._id),
    title: doc.title ?? null,
    participantIds: doc.participantIds || [],
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    lastMessageAt: doc.lastMessageAt ?? null,
    lastMessagePreview: doc.lastMessagePreview ?? null,
});

export const conversationService = {
    async createConversation(input: CreateConversationInput): Promise<Conversation> {
        const conversation = await ConversationModel.create({
            _id: randomUUID(),
            title: input.title ?? undefined,
            participantIds: input.participantIds,
        });

        const result = toConversation(conversation);
        await conversationCache.set(result);
        return result;
    },

    async getConversationById(id: string): Promise<Conversation> {
        const cached = await conversationCache.get(id);
        if (cached) return cached;

        const doc = await ConversationModel.findById(id);

        if (!doc) {
            throw new HttpError(404, 'Conversation not found');
        }

        const conversation = toConversation(doc);
        await conversationCache.set(conversation);
        return conversation;
    },

    async listConversation(filter: ConversationFilter): Promise<ConversationSummary[]> {
        const results = await ConversationModel.find({ 
            participantIds: filter.participantId 
        }).sort({ lastMessageAt: -1, updatedAt: -1 });

        return results.map(toConversation);
    },

    async touchConversation(conversationId: string, preview: string): Promise<void> {
        await ConversationModel.findByIdAndUpdate(conversationId, {
            lastMessageAt: new Date(),
            lastMessagePreview: preview,
        });
        await conversationCache.delete(conversationId);
    },

    async removeAllData(): Promise<void> {
        await Promise.all([
            ConversationModel.deleteMany({}),
            MessageModel.deleteMany({}),
        ]);
    }
};
