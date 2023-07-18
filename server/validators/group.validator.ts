import { z } from 'zod';

export const createGroupValidator = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required', invalid_type_error: 'Name must be a string' }),
    avatar: z.string({ invalid_type_error: 'Description must be a string' }).optional(),
    accounts: z.array(z.string()),
  }),
});

export const deleteGroupValidator = z.object({
  params: z.object({
    group_id: z.string({ required_error: 'Group id is required', invalid_type_error: 'Group id must be a string' }),
  }),
});

export const updateLastSeenValidator = z
  .object({
    body: z.object({
      time: z.string({ required_error: 'Time is required', invalid_type_error: 'Name must be a string' }),
    }),
  })
  .merge(deleteGroupValidator);

export const updateGroupValidator = createGroupValidator.merge(deleteGroupValidator);
