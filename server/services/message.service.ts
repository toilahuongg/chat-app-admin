import MessageModel from '@server/models/message.model';
import Pagination from '@server/models/repositories/paginate.repo';
import { TMessage } from '@server/schema/message.schema';
import { createMessageValidator, paginationMessagesValidator } from '@server/validators/message.validator';
import { z } from 'zod';
import { Types } from 'mongoose';

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
    const newMessage = await MessageModel.create({ ...body, group: group_id, account: accountId });
    return newMessage;
  }
}
