import { OK } from '@server/core/success.response';
import { CREATED } from '@server/core/success.response';
import MessageService from '@server/services/message.service';
import { Request, Response } from 'express';

export default class MessageController {
  static async create(req: Request, res: Response) {
    new CREATED({
      metadata: await MessageService.create(req.body, req.params as any, req.accountId!),
    }).send(res);
  }

  static async pagination(req: Request, res: Response) {
    new OK({
      metadata: await MessageService.pagination(req.query as any, req.params as any),
    }).send(res);
  }
}
