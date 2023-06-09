import { Request, Response } from 'express';
import { OK } from '@server/core/success.response';
import AdminService from '@server/services/admin.service';

export default class AdminController {
  static async getTopCustomers(req: Request, res: Response) {
    new OK({
      message: 'Get success!',
      metadata: await AdminService.getTopCustomers(),
    }).send(res);
  }

  static async getTopProducts(req: Request, res: Response) {
    new OK({
      message: 'Get success!',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      metadata: await AdminService.getTopProducts(),
    }).send(res);
  }
}
