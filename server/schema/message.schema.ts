import { Types } from 'mongoose';
import { z } from 'zod';

export const messageSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  msg: z.string(),
  images: z.array(z.string()).optional(),
  type: z.string(),
  account: z.instanceof(Types.ObjectId),
  group: z.instanceof(Types.ObjectId),
  createdAt: z.date(),
});

export type TMessage = z.infer<typeof messageSchema>;
