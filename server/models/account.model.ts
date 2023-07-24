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
    fullname: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: RoleModel.modelName,
        required: false,
      },
    ],
    chats: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true, collection: COLLECTION_NAME },
);
const AccountModel = model<TAccount>(DOCUMENT_NAME, AccountSchema);
export default AccountModel;
