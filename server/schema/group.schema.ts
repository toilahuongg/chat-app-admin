import { Types } from 'mongoose';
import { z } from 'zod';

export const groupSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  name: z.string(),
  avatar: z.string().optional(),
  accounts: z.array(z.instanceof(Types.ObjectId)),
  lastSeen: z.array(
    z.object({
      _id: z.instanceof(Types.ObjectId),
      time: z.date(),
    }),
  ),
  host: z.instanceof(Types.ObjectId),
  settings: z.any(),
});

export type TGroup = z.infer<typeof groupSchema>;
