import { NotFoundError } from '@server/core/error.response';
import GroupModel from '@server/models/group.model';
import MessageModel from '@server/models/message.model';
import { Pagination2 } from '@server/models/repositories/paginate.repo';
import { TMessage } from '@server/schema/message.schema';
import { createMessageValidator, paginationMessagesValidator } from '@server/validators/message.validator';
import { Types } from 'mongoose';
import { z } from 'zod';
import OneSignal from './oneSignal.service';
import GroupService from './group.service';

export default class MessageService {
  static async pagination(
    query: z.infer<typeof paginationMessagesValidator.shape.query>,
    params: z.infer<typeof paginationMessagesValidator.shape.params>,
  ) {
    const { cursor, limit } = query;
    const { group_id } = params;
    const pagination = new Pagination2<TMessage, keyof TMessage>(
      MessageModel,
      {
        group: group_id,
      },
      cursor ? new Types.ObjectId(cursor) : undefined,
      limit,
      [],
      'new',
    );
    return await pagination.paginate();
  }

  static async create(
    body: z.infer<typeof createMessageValidator.shape.body>,
    params: z.infer<typeof createMessageValidator.shape.params>,
    accountId: Types.ObjectId,
  ) {
    const { group_id } = params;
    const group = await GroupModel.findOne({ _id: group_id }).lean();
    if (!group) throw new NotFoundError('Group not found!');
    const accountIds = [...group.accounts, group.host].filter((id) => id.toString() !== accountId.toString());
    const newMessage = await MessageModel.create({
      ...body,
      type: 'msg',
      group: group_id,
      account: accountId,
    });
    await GroupService.updateLastSeen(new Types.ObjectId(group_id), accountId, newMessage.createdAt.toISOString());
    await OneSignal.createNotification(group.name, body.msg, { groupId: group_id }, accountIds);
    return newMessage;
  }
}
