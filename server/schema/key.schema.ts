import { Types } from 'mongoose';
import { z } from 'zod';

export const deviceSchema = z.object({
  _id: z.instanceof(Types.ObjectId).optional(),
  browser: z.string(),
  os: z.string(),
  ipAddress: z.string(),
  refreshToken: z.string(),
});

export const keySchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  account: z.instanceof(Types.ObjectId),
  publicKey: z.string(),
  privateKey: z.string(),
  devices: z.array(deviceSchema),
  refreshTokensUsed: z.array(z.string()),
});

export const updateRefreshTokenSchema = z.object({
  account: z.instanceof(Types.ObjectId),
  publicKey: z.string(),
  privateKey: z.string(),
  newDevice: deviceSchema,
});

export type TDevice = z.infer<typeof deviceSchema>;
export type TKey = z.infer<typeof keySchema>;
export type TUpdateRefreshToken = z.infer<typeof updateRefreshTokenSchema>;
