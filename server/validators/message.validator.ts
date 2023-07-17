import { z } from 'zod';
import { paginationValidator } from './pagination.validator';

export const groupIdValidator = z.object({
  params: z.object({
    group_id: z.string({ required_error: 'Group id is required', invalid_type_error: 'Group id must be a string' }),
  }),
});

export const createMessageValidator = z
  .object({
    body: z.object({
      msg: z.string(),
      images: z.array(z.string()).optional(),
    }),
  })
  .merge(groupIdValidator);

export const paginationMessagesValidator = paginationValidator.merge(groupIdValidator);
