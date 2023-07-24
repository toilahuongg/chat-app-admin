import { z } from 'zod';
import { paginationValidator2 } from './pagination.validator';

export const chatIdValidator = z.object({
  params: z.object({
    chat_id: z.string({ required_error: 'Chat id is required', invalid_type_error: 'Chat id must be a string' }),
  }),
});

export const createMessageValidator = z
  .object({
    body: z.object({
      content: z.string(),
      images: z.array(z.string()).optional(),
    }),
  })
  .merge(chatIdValidator);

export const paginationMessagesValidator = paginationValidator2.merge(chatIdValidator);
