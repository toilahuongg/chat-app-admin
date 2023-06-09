import { OK } from '@server/core/success.response';
import { CREATED } from '@server/core/success.response';
import RoleService from '@server/services/role.service';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

export default class RoleController {
  static async create(req: Request, res: Response) {
    new CREATED({
      metadata: await RoleService.create(req.body),
    }).send(res);
  }

  static async findAll(req: Request, res: Response) {
    new OK({
      metadata: await RoleService.findAll(),
    }).send(res);
  }

  static async findById(req: Request, res: Response) {
    new OK({
      metadata: await RoleService.findById(new Types.ObjectId(req.params.role_id)),
    }).send(res);
  }

  static async update(req: Request, res: Response) {
    new OK({
      metadata: await RoleService.update(new Types.ObjectId(req.params.role_id), req.body),
    }).send(res);
  }

  static async delete(req: Request, res: Response) {
    new OK({
      metadata: await RoleService.delete(new Types.ObjectId(req.params.role_id)),
    }).send(res);
  }
}
