import { OK } from '@server/core/success.response';
import { CREATED } from '@server/core/success.response';
import ProductService from '@server/services/product.service';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

export default class ProductController {
  static async create(req: Request, res: Response) {
    new CREATED({
      metadata: await ProductService.create(req.body, req.accountId!),
    }).send(res);
  }

  static async findAll(req: Request, res: Response) {
    new OK({
      metadata: await ProductService.findAll(),
    }).send(res);
  }

  static async findById(req: Request, res: Response) {
    new OK({
      metadata: await ProductService.findById(new Types.ObjectId(req.params.id)),
    }).send(res);
  }

  static async update(req: Request, res: Response) {
    new OK({
      metadata: await ProductService.update(new Types.ObjectId(req.params.id), req.body),
    }).send(res);
  }

  static async delete(req: Request, res: Response) {
    new OK({
      metadata: await ProductService.delete(new Types.ObjectId(req.params.id)),
    }).send(res);
  }
}
