import { NotFoundError } from '@server/core/error.response';
import GroupModel from '@server/models/group.model';
import Pagination from '@server/models/repositories/paginate.repo';
import { TGroup } from '@server/schema/group.schema';
import { createGroupValidator, updateGroupValidator } from '@server/validators/group.validator';
import { paginationValidator } from '@server/validators/pagination.validator';
import { TSort } from '@src/types';
import { Types } from 'mongoose';
import { z } from 'zod';

export default class GroupService {
  static async pagination(query: z.infer<typeof paginationValidator.shape.query>, accountId: Types.ObjectId) {
    const { keyword, sortBy, limit, page } = query;
    const pagination = new Pagination<TGroup, keyof TGroup>(
      GroupModel,
      {
        $and: [
          { $or: [{ accountIds: { $in: [accountId] } }, { host: accountId }] },
          {
            name: { $regex: `.*${keyword || ''}.*`, $options: 'i' },
          },
        ],
      },
      page,
      limit,
      [],
      sortBy as TSort,
    );
    return await pagination.paginate();
  }

  static async findById(id: Types.ObjectId, accountId: Types.ObjectId) {
    const groups = await GroupModel.aggregate([
      {
        $match: { _id: id, $or: [{ accountIds: { $in: [accountId] } }, { host: accountId }] },
      },
      {
        $lookup: {
          from: 'Accounts',
          localField: 'accountIds',
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
          as: 'hostAccount',
        },
      },
      {
        $unwind: '$hostAccount',
      },
      {
        $addFields: {
          accounts: '$accounts',
          hostAccount: '$hostAccount',
        },
      },
      {
        $group: {
          _id: '$_id',
          accounts: {
            $push: '$accounts',
          },
          hostAccount: {
            $first: '$hostAccount',
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
          accountIds: {
            $first: '$accountIds',
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

  static async create(body: z.infer<typeof createGroupValidator.shape.body>) {
    const newGroup = await GroupModel.create({ ...body });
    return newGroup;
  }

  static async update(id: Types.ObjectId, body: z.infer<typeof updateGroupValidator.shape.body>) {
    const GroupUpdated = await GroupModel.findOneAndUpdate({ _id: id }, { ...body }, { new: true }).lean();
    if (!GroupUpdated) throw new NotFoundError('Group not found');
    return GroupUpdated;
  }

  static async delete(id: Types.ObjectId) {
    const GroupUpdated = await GroupModel.findByIdAndRemove(id);
    if (!GroupUpdated) throw new NotFoundError('Group not found');
    return { GroupId: GroupUpdated._id };
  }
}
