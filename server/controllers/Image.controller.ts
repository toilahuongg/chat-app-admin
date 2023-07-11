import { CREATED } from '@server/core/success.response';
import ImageService from '@server/services/image.service';
import { Request, Response } from 'express';

export default class ImageController {
  static async upload(req: Request, res: Response) {
    new CREATED({
      metadata: await ImageService.create(req.file!, req.accountId!),
      message: 'Upload successfully',
    }).send(res);
  }
}
