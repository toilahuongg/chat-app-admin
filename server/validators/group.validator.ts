import { z } from 'zod';

export const createGroupValidator = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required', invalid_type_error: 'Name must be a string' }),
    avatar: z.string({ invalid_type_error: 'Description must be a string' }).optional(),
    accountIds: z.array(z.string()),
    host: z.string({ required_error: 'Host is required', invalid_type_error: 'Host must be a string' }),
  }),
});

export const deleteGroupValidator = z.object({
  params: z.object({
    group_id: z.string({ required_error: 'Group id is required', invalid_type_error: 'Group id must be a string' }),
  }),
});

export const updateGroupValidator = createGroupValidator.merge(deleteGroupValidator);
