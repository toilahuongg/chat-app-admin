import { Types } from 'mongoose';
import { z } from 'zod';

export const memberSchema = z.object({
  user: z.instanceof(Types.ObjectId),
  role: z.enum(['member', 'admin']),
  lastSeen: z.date(),
});
export const chatSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  name: z.string(),
  type: z.enum(['private', 'group']),
  avatar: z.string().optional(),
  images: z.array(z.instanceof(Types.ObjectId)),
  members: z.array(memberSchema),
  settings: z.any(),
});

export type TChat = z.infer<typeof chatSchema>;
export type TChatMember = z.infer<typeof memberSchema>;
