import { Request, Response } from 'express';
import { CREATED, OK } from '@server/core/success.response';
import AccountService from '@server/services/account.service';
import HEADERS from '@server/utils/headers';
import { AuthFailureError } from '@server/core/error.response';
import { Types } from 'mongoose';

class AccountController {
  static async signUp(req: Request, res: Response) {
    new CREATED({
      message: 'Registered OK!',
      metadata: await AccountService.signUp(req.body, req.device!),
    }).send(res);
  }

  static async create(req: Request, res: Response) {
    new CREATED({
      message: 'Created success!',
      metadata: await AccountService.create(req.body, req.scopes!),
    }).send(res);
  }

  static async login(req: Request, res: Response) {
    new OK({
      message: 'Login success!',
      metadata: await AccountService.login(req.body, req.device!),
    }).send(res);
  }

  static async logout(req: Request, res: Response) {
    const deviceId = req.headers[HEADERS.DEVICE_ID] as string;
    if (!deviceId) throw new AuthFailureError('Missing Device ID!');

    new OK({
      message: 'Logout success!',
      metadata: await AccountService.logout(req.accountId!, new Types.ObjectId(deviceId)),
    }).send(res);
  }

  static async refreshToken(req: Request, res: Response) {
    new OK({
      message: 'Get accessToken success!',
      metadata: await AccountService.refreshToken({
        refreshToken: req.refreshToken!,
        deviceId: req.deviceId!,
      }),
    }).send(res);
  }

  static async edit(req: Request, res: Response) {
    new OK({
      message: 'Edit success!',
      metadata: await AccountService.edit(new Types.ObjectId(req.params.id), req.body, req.scopes!),
    }).send(res);
  }

  static async changePassword(req: Request, res: Response) {
    new OK({
      message: 'Change password success!',
      metadata: await AccountService.changePassword(req.accountId!, req.body),
    }).send(res);
  }

  static async changeInformation(req: Request, res: Response) {
    new OK({
      message: 'Change information success!',
      metadata: await AccountService.changeInformation(req.accountId!, req.body),
    }).send(res);
  }

  static async getInformation(req: Request, res: Response) {
    new OK({
      message: 'Get account information success!',
      metadata: await AccountService.findById(req.accountId!),
    }).send(res);
  }

  static async findById(req: Request, res: Response) {
    new OK({
      message: 'Get account information success!',
      metadata: await AccountService.findById(new Types.ObjectId(req.params.id)),
    }).send(res);
  }

  static async delete(req: Request, res: Response) {
    new OK({
      message: 'Delete account success!',
      metadata: await AccountService.deleteById(new Types.ObjectId(req.params.id)),
    }).send(res);
  }

  static async findAllUsers(req: Request, res: Response) {
    new OK({
      message: 'Get accounts success!',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      metadata: await AccountService.findAllUsers(req.query as any),
    }).send(res);
  }
}

export default AccountController;
