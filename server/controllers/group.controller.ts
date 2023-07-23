import { OK } from '@server/core/success.response';
import { CREATED } from '@server/core/success.response';
import GroupService from '@server/services/group.service';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

export default class GroupController {
  static async create(req: Request, res: Response) {
    new CREATED({
      metadata: await GroupService.create(req.body, req.accountId!),
    }).send(res);
  }

  static async pagination(req: Request, res: Response) {
    new OK({
      metadata: await GroupService.pagination(req.query as any, req.accountId!),
    }).send(res);
  }

  static async findById(req: Request, res: Response) {
    new OK({
      metadata: await GroupService.findById(new Types.ObjectId(req.params.group_id), req.accountId!),
    }).send(res);
  }

  static async update(req: Request, res: Response) {
    new OK({
      metadata: await GroupService.update(new Types.ObjectId(req.params.group_id), req.body),
    }).send(res);
  }

  static async updateLastSeen(req: Request, res: Response) {
    new OK({
      metadata: await GroupService.updateLastSeen(
        new Types.ObjectId(req.params.group_id),
        req.accountId!,
        new Date().toISOString(),
      ),
    }).send(res);
  }

  static async delete(req: Request, res: Response) {
    new OK({
      metadata: await GroupService.delete(new Types.ObjectId(req.params.group_id)),
    }).send(res);
  }
}
