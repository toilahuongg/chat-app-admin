import { z } from 'zod';

export const createChatValidator = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required', invalid_type_error: 'Name must be a string' }),
    avatar: z.string({ invalid_type_error: 'Description must be a string' }).optional(),
    members: z.array(z.string()),
  }),
});

export const deleteChatValidator = z.object({
  params: z.object({
    chat_id: z.string({ required_error: 'Chat id is required', invalid_type_error: 'Chat id must be a string' }),
  }),
});

export const updateLastSeenValidator = deleteChatValidator;

export const updateChatValidator = createChatValidator.merge(deleteChatValidator);
