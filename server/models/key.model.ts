import { TDevice, TKey } from '@server/schema/key.schema';
import { Schema, model } from 'mongoose';
import AccountModel from './account.model';

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

const deviceSchema = new Schema<TDevice>({
  browser: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
});
const keySchema = new Schema<TKey>(
  {
    account: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: AccountModel.modelName,
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    devices: { type: [deviceSchema], required: true, default: [] },
    refreshTokensUsed: { type: [String], required: true, default: [] },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);
const KeyModel = model<TKey>(DOCUMENT_NAME, keySchema);

export default KeyModel;
