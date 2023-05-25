import { OK } from '@server/core/success.response';
import { CREATED } from '@server/core/success.response';
import ProductCategoryService from '@server/services/productCategory.service';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

export default class ProductCategoryController {
  static async createProductCategory(req: Request, res: Response) {
    new CREATED({
      metadata: await ProductCategoryService.createProductCategory(req.body, req.accountId!),
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

  static async updateProductCategory(req: Request, res: Response) {
    new OK({
      metadata: await ProductCategoryService.updateProductCategory(new Types.ObjectId(req.params.id), req.body),
    }).send(res);
  }

  static async deleteProductCategory(req: Request, res: Response) {
    new OK({
      metadata: await ProductCategoryService.deleteProductCategory(new Types.ObjectId(req.params.id)),
    }).send(res);
  }
}
