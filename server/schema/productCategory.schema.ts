import { Types } from 'mongoose';
import { z } from 'zod';

export const productCategorySchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  account: z.instanceof(Types.ObjectId),
});

export type TProductCategory = z.infer<typeof productCategorySchema>;
