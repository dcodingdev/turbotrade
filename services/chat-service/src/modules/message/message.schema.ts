import { z } from 'zod';

export const createMessageBodySchema = z.object({
    body: z.string().min(1).max(5000),
});

export const listMessagesQuerySchema = z.object({
    limit: z.number().int().min(1).max(100).optional().default(50),
    after: z.string().datetime().optional(),
});
