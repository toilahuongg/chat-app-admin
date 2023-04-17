import { Types } from 'mongoose';
import { TDevice } from './schema/key.schema';

declare global {
  namespace Express {
    interface Request {
      accountId?: Types.ObjectId | undefined;
      device?: TDevice | undefined;
      deviceId?: Types.ObjectId | undefined;
      refreshToken?: string | undefined;
      scopes?: string[] | undefined;
    }
  }
  interface String {
    toUpperCaseFirstLetter(): string;
  }
}
