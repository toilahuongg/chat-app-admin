import { NotFoundError } from '@server/core/error.response';
import ChatModel from '@server/models/chat.model';
import { getSkipItems } from '@server/utils';
import { paginationValidator } from '@server/validators/pagination.validator';
import { Types } from 'mongoose';
import { z } from 'zod';
import AccountService from './account.service';
import { createChatValidator, updateChatValidator } from '@server/validators/chat.validator';
import { TChatMember } from '@server/schema/chat.schema';
import MessageService from './message.service';

export default class ChatService {
  static async pagination(query: z.infer<typeof paginationValidator.shape.query>, accountId: Types.ObjectId) {
    const { keyword, limit, page } = query;
    const skip = getSkipItems(page, limit);
    const match = {
      $and: [
        { 'members.user': { $in: [accountId] } },
        {
          name: { $regex: `.*${keyword || ''}.*`, $options: 'i' },
        },
      ],
    };
    const totalPage = Math.floor((await ChatModel.countDocuments(match)) / limit) + 1;
    const items = await ChatModel.aggregate([
      {
        $match: match,
      },
      {
        $lookup: {
          from: 'Messages',
          let: {
            chatId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$chatId', '$$chatId'],
                },
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 1,
            },
            {
              $lookup: {
                from: 'Accounts',
                localField: 'sender',
                foreignField: '_id',
                as: 'sender',
              },
            },
            {
              $unwind: '$sender',
            },
          ],
          as: 'lastMessage',
        },
      },
      {
        $unwind: {
          path: '$lastMessage',
          // preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          'lastMessage.createdAt': -1,
        },
      },
      {
        $lookup: {
          from: 'Accounts',
          localField: 'members.user',
          foreignField: '_id',
          as: 'membersInfo',
        },
      },
      { $limit: limit },
      { $skip: skip },
    ]);
    return {
      items,
      currentPage: page <= 1 ? 1 : page,
      totalPage: totalPage,
      prevPage: page <= 1 ? null : page - 1,
      nextPage: page >= totalPage ? null : page + 1,
    };
  }

  static async findById(id: Types.ObjectId, accountId: Types.ObjectId) {
    const chat = await ChatModel.findOne({ _id: id, 'members.user': { $in: [accountId] }, type: 'group' })
      .populate('members.user')
      .lean();
    return chat;
  }

  static async findPrivate(recipientId: Types.ObjectId, accountId: Types.ObjectId) {
    const chat = await ChatModel.findOne({
      type: 'private', // Lọc ra các cuộc trò chuyện riêng tư
      'members.user': { $all: [recipientId, accountId] }, // Điều kiện để cả bạn và người cụ thể là thành viên của cuộc trò chuyện
    })
      .populate('members.user')
      .lean();
    if (chat) return chat;
    await AccountService.findById(recipientId);
    const members: Partial<TChatMember>[] = [
      {
        user: recipientId,
        role: 'admin',
      },
      {
        user: accountId,
        role: 'admin',
      },
    ];
    const newChat = new ChatModel({ name: '', avatar: '', members, type: 'private' });
    newChat.save();
    newChat.populate('members.user');
    return newChat.populate('members.user');
  }

  static async create(body: z.infer<typeof createChatValidator.shape.body>, accountId: Types.ObjectId) {
    const members: Partial<TChatMember>[] = body.members.map((id) => ({
      user: new Types.ObjectId(id),
      role: 'member',
    }));
    members.push({
      user: accountId,
      role: 'admin',
      lastSeen: new Date(),
    });

    const newChat = await ChatModel.create({ ...body, members, type: 'group' });
    const accountIds = newChat.members.map(({ user }) => user);
    await Promise.all(accountIds.map((accountId) => AccountService.addChat(accountId, newChat._id)));
    await MessageService.createNotify(
      {
        content: '{name} đã tạo nhóm',
        images: [],
      },
      {
        chat_id: newChat._id.toString(),
      },
      accountId,
    );
    return newChat;
  }

  static async update(id: Types.ObjectId, body: z.infer<typeof updateChatValidator.shape.body>) {
    const chatUpdate = await ChatModel.findOneAndUpdate({ _id: id }, { ...body }, { new: true }).lean();
    if (!chatUpdate) throw new NotFoundError('Chat not found');
    return chatUpdate;
  }

  static async updateLastSeen(chatId: Types.ObjectId, accountId: Types.ObjectId, time: string) {
    // const session: ClientSession = await mongoose.startSession();

    // session.startTransaction();
    // try {
    const chat = await ChatModel.findOne({ _id: chatId }).lean();
    if (!chat) throw new NotFoundError('Chat not found');
    const members = chat.members || [];
    const idx = members.findIndex(({ user }) => user.toString() === accountId.toString());
    if (idx >= 0) members[idx].lastSeen = new Date(time);
    else members.push({ user: accountId, lastSeen: new Date(time), role: 'member' });
    const updated = await ChatModel.findOneAndUpdate({ _id: chatId }, { members }, { new: true }).lean();
    return updated;
    //   await session.commitTransaction();
    //   return updated;
    // } catch (error) {
    //   await session.abortTransaction();
    //   throw error;
    // } finally {
    //   session.endSession();
    // }
  }

  static async delete(id: Types.ObjectId) {
    const chatUpdate = await ChatModel.findByIdAndRemove(id);
    if (!chatUpdate) throw new NotFoundError('Chat not found');
    return { chatId: chatUpdate._id };
  }
}
