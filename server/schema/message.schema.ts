import { Types } from 'mongoose';
import { z } from 'zod';

export const messageSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  content: z.string(),
  images: z.array(z.string()).optional(),
  type: z.enum(['only-content']),
  sender: z.instanceof(Types.ObjectId),
  chatId: z.instanceof(Types.ObjectId),
  createdAt: z.date(),
});

export type TMessage = z.infer<typeof messageSchema>;
