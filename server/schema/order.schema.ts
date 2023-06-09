import { Types } from 'mongoose';
import { z } from 'zod';

export const productOrderSchema = z.object({
  productId: z.instanceof(Types.ObjectId),
  quantity: z.number(),
  price: z.number(),
});

export const orderSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  detail: z.string(),
  products: z.array(productOrderSchema),
  accountId: z.instanceof(Types.ObjectId),
  total: z.number(),
});

export type TOrder = z.infer<typeof orderSchema>;
export type TProductOrder = z.infer<typeof productOrderSchema>;
