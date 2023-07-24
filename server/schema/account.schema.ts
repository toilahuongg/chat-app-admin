import { Types } from 'mongoose';
import { z } from 'zod';

export const accountSchema = z.object({
  _id: z.instanceof(Types.ObjectId),
  username: z.string(),
  password: z.string(),
  fullname: z.string().optional(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  roles: z.array(z.instanceof(Types.ObjectId)),
  chats: z.array(z.instanceof(Types.ObjectId)),
});

export const accountEncryptSchema = z.object({
  accountId: z.string(),
  username: z.string(),
});

export const refreshTokenSchema = z.object({
  deviceId: z.instanceof(Types.ObjectId),
  refreshToken: z.string(),
});

export type TAccountEncrypt = z.infer<typeof accountEncryptSchema>;
export type TAccount = z.infer<typeof accountSchema>;
export type TRefreshTokenSchema = z.infer<typeof refreshTokenSchema>;
