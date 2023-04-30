import { TAccount } from '@server/schema/account.schema';
import { Schema, model } from 'mongoose';
import RoleModel from './role.model';

const DOCUMENT_NAME = 'Account';
const COLLECTION_NAME = 'Accounts';
const AccountSchema = new Schema<TAccount>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    email: { type: String, required: true },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: RoleModel.modelName,
        required: false,
      },
    ],
  },
  { timestamps: true, collection: COLLECTION_NAME },
);
AccountSchema.index({ firstName: 'text', lastName: 'text', username: 'text', email: 'text' });
const AccountModel = model<TAccount>(DOCUMENT_NAME, AccountSchema);
export default AccountModel;
