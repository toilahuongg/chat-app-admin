import { Types } from 'mongoose';
import { z } from 'zod';

export const groupSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  name: z.string(),
  avatar: z.string().optional(),
  accountIds: z.array(z.instanceof(Types.ObjectId)),
  host: z.instanceof(Types.ObjectId),
  settings: z.any(),
});

export type TGroup = z.infer<typeof groupSchema>;
