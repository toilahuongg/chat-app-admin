import { NotFoundError } from '@server/core/error.response';
import GroupModel from '@server/models/group.model';
import { getSkipItems } from '@server/utils';
import { createGroupValidator, updateGroupValidator } from '@server/validators/group.validator';
import { paginationValidator } from '@server/validators/pagination.validator';
import { Types } from 'mongoose';
import { z } from 'zod';
import AccountService from './account.service';

export default class GroupService {
  static async pagination(query: z.infer<typeof paginationValidator.shape.query>, accountId: Types.ObjectId) {
    const { keyword, limit, page } = query;
    const skip = getSkipItems(page, limit);
    const match = {
      $and: [
        { $or: [{ accounts: { $in: [accountId] } }, { host: accountId }] },
        {
          name: { $regex: `.*${keyword || ''}.*`, $options: 'i' },
        },
      ],
    };
    const totalPage = Math.floor((await GroupModel.countDocuments(match)) / limit) + 1;
    const items = await GroupModel.aggregate([
      {
        $match: match,
      },
      {
        $lookup: {
          from: 'Messages',
          let: {
            groupId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$group', '$$groupId'],
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
                localField: 'account',
                foreignField: '_id',
                as: 'account',
              },
            },
            {
              $unwind: '$account',
            },
          ],
          as: 'lastMessage',
        },
      },
      {
        $unwind: '$lastMessage',
      },
      {
        $sort: {
          'lastMessage.createdAt': -1,
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
    const groups = await GroupModel.aggregate([
      {
        $match: { _id: id, $or: [{ accounts: { $in: [accountId] } }, { host: accountId }] },
      },
      {
        $lookup: {
          from: 'Accounts',
          localField: 'accounts',
          foreignField: '_id',
          as: 'accounts',
        },
      },
      {
        $unwind: '$accounts',
      },
      {
        $lookup: {
          from: 'Accounts',
          localField: 'host',
          foreignField: '_id',
          as: 'host',
        },
      },
      {
        $unwind: '$host',
      },
      {
        $group: {
          _id: '$_id',
          accounts: {
            $push: '$accounts',
          },
          name: {
            $first: '$name',
          },
          avatar: {
            $first: '$avatar',
          },
          host: {
            $first: '$host',
          },
          lastSeen: {
            $first: '$lastSeen',
          },
          createdAt: {
            $first: '$createdAt',
          },
          updatedAt: {
            $first: '$updatedAt',
          },
        },
      },
    ]);
    return groups.length > 0 ? groups[0] : null;
  }

  static async create(body: z.infer<typeof createGroupValidator.shape.body>, accountId: Types.ObjectId) {
    const newGroup = await GroupModel.create({ ...body, host: accountId });
    const accountIds = [...newGroup.accounts, newGroup.host];
    await Promise.all(accountIds.map((accountId) => AccountService.addGroup(accountId, newGroup._id)));
    return newGroup;
  }

  static async update(id: Types.ObjectId, body: z.infer<typeof updateGroupValidator.shape.body>) {
    const GroupUpdated = await GroupModel.findOneAndUpdate({ _id: id }, { ...body }, { new: true }).lean();
    if (!GroupUpdated) throw new NotFoundError('Group not found');
    return GroupUpdated;
  }

  static async updateLastSeen(groupId: Types.ObjectId, accountId: Types.ObjectId, time: string) {
    // const session: ClientSession = await mongoose.startSession();

    // session.startTransaction();
    // try {
    const group = await GroupModel.findOne({ _id: groupId }).lean();
    if (!group) throw new NotFoundError('Group not found');
    const lastSeen = group.lastSeen || [];
    const idx = lastSeen.findIndex(({ _id }) => _id.toString() === accountId.toString());
    if (idx >= 0) lastSeen[idx].time = new Date(time);
    else lastSeen.push({ _id: accountId, time: new Date(time) });
    const updated = await GroupModel.findOneAndUpdate({ _id: groupId }, { lastSeen }, { new: true }).lean();
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
    const GroupUpdated = await GroupModel.findByIdAndRemove(id);
    if (!GroupUpdated) throw new NotFoundError('Group not found');
    return { GroupId: GroupUpdated._id };
  }
}
