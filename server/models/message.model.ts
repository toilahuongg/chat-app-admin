import { TMessage } from '@server/schema/message.schema';
import { Schema, model } from 'mongoose';
import AccountModel from './account.model';
import GroupModel from './group.model';

const DOCUMENT_NAME = 'Message';
const COLLECTION_NAME = 'Messages';

const MessageSchema = new Schema<TMessage>(
  {
    msg: { type: String },
    images: { type: [String] },
    account: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: AccountModel.modelName,
    },
    group: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: GroupModel.modelName,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);

const MessageModel = model<TMessage>(DOCUMENT_NAME, MessageSchema);

export default MessageModel;
