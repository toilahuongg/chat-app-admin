import { OK } from '@server/core/success.response';
import { CREATED } from '@server/core/success.response';
import ProductService from '@server/services/product.service';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

export default class ProductController {
  static async createProduct(req: Request, res: Response) {
    new CREATED({
      metadata: await ProductService.createProduct(req.body, req.accountId!),
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

  static async updateProduct(req: Request, res: Response) {
    new OK({
      metadata: await ProductService.updateProduct(new Types.ObjectId(req.params.id), req.body),
    }).send(res);
  }

  static async deleteProduct(req: Request, res: Response) {
    new OK({
      metadata: await ProductService.deleteProduct(new Types.ObjectId(req.params.id)),
    }).send(res);
  }
}
