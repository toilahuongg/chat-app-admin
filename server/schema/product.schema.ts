import { Types } from 'mongoose';
import { z } from 'zod';

export const productMediaSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  type: z.string(),
  src: z.string(),
  file: z.instanceof(Types.ObjectId),
});

export const productOptionItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string().optional(),
});

export const productOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  values: z.array(productOptionItemSchema),
});

export const productVariantSchema = z.object({
  id: z.string(),
  title: z.string(),
  sku: z.string(),
  media: z.instanceof(Types.ObjectId),
  price: z.number(),
  compareAtPrice: z.number(),
  options: z.array(z.string()),
});

export const productSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  price: z.number(),
  compareAtPrice: z.number(),
  tags: z.array(z.string()),
  status: z.enum(['active', 'draft', 'archived']),
  collections: z.array(z.instanceof(Types.ObjectId)),
  media: z.array(productMediaSchema),
  options: z.array(productOptionSchema),
  variants: z.array(productVariantSchema),
  account: z.instanceof(Types.ObjectId),
});

export type TProduct = z.infer<typeof productSchema>;
export type TProductOption = z.infer<typeof productOptionSchema>;
export type TProductOptionItem = z.infer<typeof productOptionItemSchema>;
export type TProductVariant = z.infer<typeof productVariantSchema>;
