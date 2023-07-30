import { Schema, model } from 'mongoose';
import AccountModel from './account.model';
import { TChat, TChatMember } from '@server/schema/chat.schema';
import ImageModel from './image.model';

const DOCUMENT_NAME = 'Chat';
const COLLECTION_NAME = 'Chats';

const memberSchema = new Schema<TChatMember>(
  {
    user: { type: Schema.Types.ObjectId, ref: AccountModel.modelName, required: true },
    role: { type: String, enum: ['member', 'admin'], default: 'member' },
    lastSeen: { type: Date, default: Date.now },
  },
  { _id: false },
);

const ChatSchema = new Schema<TChat>(
  {
    name: { type: String },
    type: { type: String, enum: ['private', 'group'], required: true },
    avatar: { type: String },
    members: [memberSchema],
    settings: { type: Object },
    images: { type: [Schema.Types.ObjectId], ref: ImageModel.modelName },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);

const ChatModel = model<TChat>(DOCUMENT_NAME, ChatSchema);

export default ChatModel;
