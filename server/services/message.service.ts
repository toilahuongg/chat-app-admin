import { NotFoundError } from '@server/core/error.response';
import GroupModel from '@server/models/group.model';
import MessageModel from '@server/models/message.model';
import Pagination from '@server/models/repositories/paginate.repo';
import { TMessage } from '@server/schema/message.schema';
import { createMessageValidator, paginationMessagesValidator } from '@server/validators/message.validator';
import { Types } from 'mongoose';
import { z } from 'zod';
import OneSignal from './oneSignal.service';

export default class MessageService {
  static async pagination(
    query: z.infer<typeof paginationMessagesValidator.shape.query>,
    params: z.infer<typeof paginationMessagesValidator.shape.params>,
  ) {
    const { limit, page } = query;
    const { group_id } = params;
    const pagination = new Pagination<TMessage, keyof TMessage>(
      MessageModel,
      {
        group: group_id,
      },
      page,
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
    await OneSignal.createNotification(group.name, body.msg, { groupId: group_id }, accountIds);
    return newMessage;
  }
}
