import type { Conversation } from '@/types/conversation.types';
import { getRedisClient } from '@/clients/redis.client';

const CACHE_PREFIX = 'conversation:';
const CACHE_TTL_SECONDS = 3600;

const serialize = (conversation: Conversation): string => {
    return JSON.stringify({
        ...conversation,
        createdAt: conversation.createdAt.toISOString(),
        updatedAt: conversation.updatedAt.toISOString(),
    });
};

const deserialize = (raw: string): Conversation => {
    const parsed = JSON.parse(raw);
    return {
        ...parsed,
        createdAt: new Date(parsed.createdAt),
        updatedAt: new Date(parsed.updatedAt),
    };
};

export const conversationCache = {
    async get(conversationId: string): Promise<Conversation | null> {
        try {
            const redis = getRedisClient();
            const payload = await redis.get(`${CACHE_PREFIX}${conversationId}`);
            return payload ? deserialize(payload) : null;
        } catch (error) {
            console.error('Cache get error', error);
            return null;
        }
    },

    async set(conversation: Conversation): Promise<void> {
        try {
            const redis = getRedisClient();
            await redis.set(
                `${CACHE_PREFIX}${conversation.id}`,
                serialize(conversation),
                'EX',
                CACHE_TTL_SECONDS,
            );
        } catch (error) {
            console.error('Cache set error', error);
        }
    },

    async delete(conversationId: string): Promise<void> {
        try {
            const redis = getRedisClient();
            await redis.del(`${CACHE_PREFIX}${conversationId}`);
        } catch (error) {
            console.error('Cache delete error', error);
        }
    },
};
