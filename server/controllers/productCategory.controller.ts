import { OK } from '@server/core/success.response';
import { CREATED } from '@server/core/success.response';
import ProductCategoryService from '@server/services/productCategory.service';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

export default class ProductCategoryController {
  static async create(req: Request, res: Response) {
    new CREATED({
      metadata: await ProductCategoryService.create(req.body, req.accountId!),
    }).send(res);
  }

  static async findAll(req: Request, res: Response) {
    new OK({
      metadata: await ProductCategoryService.findAll(),
    }).send(res);
  }

  static async findById(req: Request, res: Response) {
    new OK({
      metadata: await ProductCategoryService.findById(new Types.ObjectId(req.params.id)),
    }).send(res);
  }

  static async update(req: Request, res: Response) {
    new OK({
      metadata: await ProductCategoryService.update(new Types.ObjectId(req.params.id), req.body),
    }).send(res);
  }

  static async delete(req: Request, res: Response) {
    new OK({
      metadata: await ProductCategoryService.delete(new Types.ObjectId(req.params.id)),
    }).send(res);
  }
}
