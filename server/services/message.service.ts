import { NotFoundError } from '@server/core/error.response';
import ChatModel from '@server/models/chat.model';
import MessageModel from '@server/models/message.model';
import { createMessageValidator, paginationMessagesValidator } from '@server/validators/message.validator';
import { Types } from 'mongoose';
import { z } from 'zod';
import AccountService from './account.service';
import ChatService from './chat.service';
import OneSignal from './oneSignal.service';

export default class MessageService {
  static async pagination(
    query: z.infer<typeof paginationMessagesValidator.shape.query>,
    params: z.infer<typeof paginationMessagesValidator.shape.params>,
  ) {
    const { cursor, limit } = query;
    const { chat_id } = params;
    const items = await MessageModel.find(Object.assign({ chatId: chat_id }, cursor ? { _id: { $lt: cursor } } : {}))
      .populate('images')
      .sort({ _id: -1 })
      .limit(limit)
      .lean()
      .exec();
    return {
      items,
      lastCursor: items[items.length - 1]?._id,
    };
  }

  static async createContent(
    body: z.infer<typeof createMessageValidator.shape.body>,
    params: z.infer<typeof createMessageValidator.shape.params>,
    accountId: Types.ObjectId,
  ) {
    const { chat_id } = params;
    const chat = await ChatModel.findOne({ _id: chat_id }).lean();
    const sender = await AccountService.findById(accountId);
    const name = sender.fullname || sender.username;

    if (!chat) throw new NotFoundError('Chat not found!');
    const accountIds = chat.members.map(({ user }) => user).filter((user) => user.toString() !== accountId.toString());
    const newMessage = await MessageModel.create({
      ...body,
      type: 'content',
      chatId: chat_id,
      sender: accountId,
    });
    await Promise.all([
      ChatService.updateLastSeen(new Types.ObjectId(chat_id), accountId, newMessage.createdAt.toISOString()),
      ChatService.updateImages(new Types.ObjectId(chat_id), body.images),
      async () => {
        if (chat.type === 'private') {
          await OneSignal.createNotification(name!, body.content, { chatId: chat_id }, accountIds);
        } else {
          await OneSignal.createNotification(
            `${name} vừa gửi tin nhắn trong ${chat.name}`,
            body.content,
            { chatId: chat_id },
            accountIds,
          );
        }
      },
    ]);

    return MessageModel.findOne({ _id: newMessage._id }).populate('images').lean();
  }

  static async createNotify(
    body: z.infer<typeof createMessageValidator.shape.body>,
    params: z.infer<typeof createMessageValidator.shape.params>,
    accountId: Types.ObjectId,
  ) {
    const { chat_id } = params;
    const chat = await ChatModel.findOne({ _id: chat_id }).lean();
    const sender = await AccountService.findById(accountId);
    const name = sender.fullname || sender.username;

    if (!chat) throw new NotFoundError('Chat not found!');
    const accountIds = chat.members.map(({ user }) => user).filter((user) => user.toString() !== accountId.toString());
    const newMessage = await MessageModel.create({
      ...body,
      type: 'notify',
      chatId: chat_id,
      sender: accountId,
    });
    await ChatService.updateLastSeen(new Types.ObjectId(chat_id), accountId, newMessage.createdAt.toISOString());
    if (chat.type === 'private') {
      await OneSignal.createNotification(
        name!,
        body.content.replace(/\{\s*name\s*\}/gi, name!),
        { chatId: chat_id },
        accountIds,
      );
    } else {
      await OneSignal.createNotification(
        `${name} vừa thay đổi trong ${chat.name}`,
        body.content.replace(/\{\s*name\s*\}/gi, name!),
        { chatId: chat_id },
        accountIds,
      );
    }
    return newMessage;
  }
}
