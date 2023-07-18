import { TGroup } from '@server/schema/group.schema';
import { Schema, model } from 'mongoose';
import AccountModel from './account.model';

const DOCUMENT_NAME = 'Group';
const COLLECTION_NAME = 'Groups';

const GroupSchema = new Schema<TGroup>(
  {
    name: { type: String },
    avatar: { type: String },
    lastSeen: {
      type: [
        {
          _id: Schema.Types.ObjectId,
          time: Date,
        },
      ],
    },
    accounts: [
      {
        type: Schema.Types.ObjectId,
        ref: AccountModel.modelName,
        required: false,
      },
    ],
    host: {
      type: Schema.Types.ObjectId,
      ref: AccountModel.modelName,
      required: true,
    },
    settings: { type: Object },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);

const GroupModel = model<TGroup>(DOCUMENT_NAME, GroupSchema);

export default GroupModel;
