import { Types } from 'mongoose';
import { z } from 'zod';

export const imageSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  name: z.string(),
  size: z.number(),
  mimeType: z.string(),
  url: z.string(),
  accountId: z.instanceof(Types.ObjectId),
});

export type TImage = z.infer<typeof imageSchema>;
