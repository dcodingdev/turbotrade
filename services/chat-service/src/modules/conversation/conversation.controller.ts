import { asyncHandler, HttpError } from '@repo/common';
import { Request, Response } from 'express';
import { conversationService } from './conversation.service';
import {
    createConversationSchema,
    conversationIdParamsSchema,
    listConversationsQuerySchema,
} from './conversation.schema';
import { getAuthenticatedUser } from '@/utils/auth';

const getValidatedId = (params: unknown): string => {
    const { id } = conversationIdParamsSchema.parse(params);
    return id;
};

export const createConversationHandler = asyncHandler(async (req: Request, res: Response) => {
    const user = getAuthenticatedUser(req);
    const payload = createConversationSchema.parse(req.body);

    const uniqueParticipantIds = Array.from(new Set([...payload.participantIds, user._id]));

    if (uniqueParticipantIds.length < 2) {
        throw new HttpError(400, 'Conversation must at least include one other participant');
    }

    const conversation = await conversationService.createConversation({
        title: payload.title,
        participantIds: uniqueParticipantIds,
    });

    res.status(201).json({ data: conversation });
});

export const listConversationHandler = asyncHandler(async (req: Request, res: Response) => {
    const user = getAuthenticatedUser(req);

    const conversations = await conversationService.listConversation({
        participantId: user._id
    });

    res.status(200).json({ data: conversations });
});

export const getConversationHandler = asyncHandler(async (req: Request, res: Response) => {
    const user = getAuthenticatedUser(req);
    const conversationId = getValidatedId(req.params);

    const conversation = await conversationService.getConversationById(conversationId);

    if (!conversation.participantIds.includes(user._id)) {
        throw new HttpError(403, 'Unauthorized');
    }

    res.status(200).json({ data: conversation });
});
