import { z } from 'zod';

export const createRoleValidator = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required', invalid_type_error: 'Name must be a string' }),
    desc: z.string({ invalid_type_error: 'Description must be a string' }).optional(),
    scopes: z.array(z.string()),
  }),
});

export const deleteRoleValidator = z.object({
  params: z.object({
    role_id: z.string({ required_error: 'Role id is required', invalid_type_error: 'Role id must be a string' }),
  }),
});

export const updateRoleValidator = createRoleValidator.merge(deleteRoleValidator);
