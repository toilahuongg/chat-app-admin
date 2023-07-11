import { z } from 'zod';

export const paginationValidator = z.object({
  query: z.object({
    keyword: z.string().optional(),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 0)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val) : 20)),
    sortBy: z.string().optional(),
  }),
});
