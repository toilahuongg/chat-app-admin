import { Schema, model } from 'mongoose';
import AccountModel from './account.model';
import { TChat } from '@server/schema/chat.schema';

const DOCUMENT_NAME = 'Chat';
const COLLECTION_NAME = 'Chats';

const chatMemberSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: AccountModel.modelName, required: true }, // Reference tới bảng "users"
    role: { type: String, enum: ['member', 'admin'], default: 'member' },
    lastSeen: { type: Date, default: Date.now }, // Thời gian xem cuối cùng của thành viên
  },
  { _id: false },
); // Tùy chọn để không sử dụng trường "_id" cho mảng members

const ChatSchema = new Schema<TChat>(
  {
    name: { type: String },
    type: { type: String, enum: ['private', 'group'], required: true },
    avatar: { type: String },
    members: [chatMemberSchema],
    settings: { type: Object },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);

const ChatModel = model<TChat>(DOCUMENT_NAME, ChatSchema);

export default ChatModel;
