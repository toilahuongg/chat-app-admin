import { Types } from 'mongoose';
import { z } from 'zod';

export const collectionSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  account: z.instanceof(Types.ObjectId),
});

export type TCollection = z.infer<typeof collectionSchema>;
