import { OK } from '@server/core/success.response';
import { CREATED } from '@server/core/success.response';
import RoleService from '@server/services/role.service';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

export default class RoleController {
  static async createRole(req: Request, res: Response) {
    new CREATED({
      metadata: await RoleService.createRole(req.body),
    }).send(res);
  }

  static async findAll(req: Request, res: Response) {
    new OK({
      metadata: await RoleService.findAll(),
    }).send(res);
  }

  static async updateRole(req: Request, res: Response) {
    new OK({
      metadata: await RoleService.updateRole(new Types.ObjectId(req.params.role_id), req.body),
    }).send(res);
  }

  static async deleteRole(req: Request, res: Response) {
    new OK({
      metadata: await RoleService.deleteRole(new Types.ObjectId(req.params.role_id)),
    }).send(res);
  }
}
