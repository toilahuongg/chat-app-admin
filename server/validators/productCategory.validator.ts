import { z } from 'zod';

export const createProductCategoryValidator = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required', invalid_type_error: 'Title must be a string' }),
    description: z.string({ invalid_type_error: 'Description must be a string' }).optional(),
    slug: z.string({ invalid_type_error: 'Slug must be a string' }).optional(),
  }),
});

export const deleteProductCategoryValidator = z.object({
  params: z.object({
    id: z.string({ required_error: 'Category id is required', invalid_type_error: 'Category id must be a string' }),
  }),
});

export const updateProductCategoryValidator = createProductCategoryValidator.merge(deleteProductCategoryValidator);
