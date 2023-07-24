import { OK } from '@server/core/success.response';
import { CREATED } from '@server/core/success.response';
import ChatService from '@server/services/chat.service';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

export default class ChatController {
  static async create(req: Request, res: Response) {
    new CREATED({
      metadata: await ChatService.create(req.body, req.accountId!),
    }).send(res);
  }

  static async pagination(req: Request, res: Response) {
    new OK({
      metadata: await ChatService.pagination(req.query as any, req.accountId!),
    }).send(res);
  }

  static async findById(req: Request, res: Response) {
    new OK({
      metadata: await ChatService.findById(new Types.ObjectId(req.params.chat_id), req.accountId!),
    }).send(res);
  }

  static async update(req: Request, res: Response) {
    new OK({
      metadata: await ChatService.update(new Types.ObjectId(req.params.chat_id), req.body),
    }).send(res);
  }

  static async updateLastSeen(req: Request, res: Response) {
    new OK({
      metadata: await ChatService.updateLastSeen(
        new Types.ObjectId(req.params.chat_id),
        req.accountId!,
        new Date().toISOString(),
      ),
    }).send(res);
  }

  static async delete(req: Request, res: Response) {
    new OK({
      metadata: await ChatService.delete(new Types.ObjectId(req.params.chat_id)),
    }).send(res);
  }
}
