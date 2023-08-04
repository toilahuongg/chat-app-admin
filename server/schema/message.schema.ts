import { Types } from 'mongoose';
import { z } from 'zod';

export const messageSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  content: z.string(),
  images: z.array(z.instanceof(Types.ObjectId)),
  type: z.enum(['content', 'notify']),
  sender: z.instanceof(Types.ObjectId),
  chatId: z.instanceof(Types.ObjectId),
  reply: z.instanceof(Types.ObjectId),
  createdAt: z.date(),
});

export type TMessage = z.infer<typeof messageSchema>;
