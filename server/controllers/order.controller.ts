import { CREATED, OK } from '@server/core/success.response';
import OrderService from '@server/services/order.service';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

export default class OrderController {
  static async create(req: Request, res: Response) {
    new CREATED({
      metadata: await OrderService.create(req.body, req.accountId!),
    }).send(res);
  }

  static async findAll(req: Request, res: Response) {
    new OK({
      metadata: await OrderService.findAll(),
    }).send(res);
  }

  static async findById(req: Request, res: Response) {
    new OK({
      metadata: await OrderService.findById(new Types.ObjectId(req.params.id)),
    }).send(res);
  }

  static async update(req: Request, res: Response) {
    new OK({
      metadata: await OrderService.update(new Types.ObjectId(req.params.id), req.body),
    }).send(res);
  }

  static async delete(req: Request, res: Response) {
    new OK({
      metadata: await OrderService.delete(new Types.ObjectId(req.params.id)),
    }).send(res);
  }
}
