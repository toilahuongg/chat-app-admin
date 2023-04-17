import { z } from 'zod';

const errorSchema = z.object({
  message: z.string().optional(),
  statusCode: z.number().optional(),
});

export type TInputError = z.infer<typeof errorSchema>;

const successSchema = z.object({
  message: z.string().optional(),
  statusCode: z.number().optional(),
  metadata: z.any(),
});

export type TInputSuccess<T> = Omit<z.infer<typeof successSchema>, 'metadata'> & { metadata: T };
