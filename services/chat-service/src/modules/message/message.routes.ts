import { Router } from 'express';
import { attachAuthenticatedUser, validateRequest } from '@repo/common';
import * as controller from './message.controller';
import { createMessageBodySchema, listMessagesQuerySchema } from './message.schema';
import { conversationIdParamsSchema } from '../conversation/conversation.schema';

const router = Router();

router.use(attachAuthenticatedUser);

router.post(
    '/:id/messages',
    validateRequest({
        params: conversationIdParamsSchema,
        body: createMessageBodySchema
    }),
    controller.createMessageHandler,
);

router.get(
    '/:id/messages',
    validateRequest({
        params: conversationIdParamsSchema,
        query: listMessagesQuerySchema
    }),
    controller.listMessageHandler,
);

export default router;
export { router as messageRouter };
