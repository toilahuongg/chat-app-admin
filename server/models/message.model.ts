import { TMessage } from '@server/schema/message.schema';
import { Schema, model } from 'mongoose';
import AccountModel from './account.model';
import ChatModel from './chat.model';

const DOCUMENT_NAME = 'Message';
const COLLECTION_NAME = 'Messages';

const MessageSchema = new Schema<TMessage>(
  {
    content: { type: String },
    images: { type: [String], default: [] },
    type: { type: String, enum: ['content', 'notify'], default: 'content' },
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: AccountModel.modelName,
    },
    chatId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ChatModel.modelName,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);

const MessageModel = model<TMessage>(DOCUMENT_NAME, MessageSchema);

export default MessageModel;
