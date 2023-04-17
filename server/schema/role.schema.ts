import { Types } from 'mongoose';
import { z } from 'zod';

export const roleSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  name: z.string(),
  desc: z.string().optional(),
  scopes: z.array(z.string()),
});

export type TRole = z.infer<typeof roleSchema>;
