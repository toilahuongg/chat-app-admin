import { Types } from 'mongoose';
import { z } from 'zod';

export const settingsSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  appName: z.string().optional(),
  isInstalled: z.boolean(),
});
