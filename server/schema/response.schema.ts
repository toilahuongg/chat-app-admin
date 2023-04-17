import { z } from 'zod';

const errorSchema = z.object({
  message: z.string().optional(),
  statusCode: z.number().optional(),
});

export type TErrorResponse = z.infer<typeof errorSchema>;

const successSchema = z.object({
  message: z.string().optional(),
  statusCode: z.number().optional(),
  metadata: z.any(),
});

export type TSuccessResponse<T> = Omit<z.infer<typeof successSchema>, 'metadata'> & { metadata: T };
