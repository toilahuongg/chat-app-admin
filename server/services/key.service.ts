import KeyModel from '@server/models/key.model';
import { TDevice, TKey, TUpdateRefreshToken } from '@server/schema/key.schema';
import { Types } from 'mongoose';

export default class KeyService {
  static async createKeyToken({ account, publicKey, privateKey, devices }: Omit<TKey, '_id'>): Promise<TDevice> {
    try {
      const tokens = await KeyModel.create({
        account,
        publicKey,
        privateKey,
        devices,
      });
      return tokens.devices[0];
    } catch (error) {
      console.log('createKeyToken::', error);
      throw error;
    }
  }

  static async updateRefreshToken({
    account,
    publicKey,
    privateKey,
    newDevice,
  }: TUpdateRefreshToken): Promise<TDevice> {
    try {
      const key = await KeyModel.findOne({ account }, { _id: 0, devices: 1, refreshTokensUsed: 1 }).lean();
      if (!key)
        return await this.createKeyToken({
          account,
          publicKey,
          privateKey,
          devices: [newDevice],
          refreshTokensUsed: [],
        });

      key.devices.push(newDevice);

      if (key.devices.length > 10) {
        const device = key.devices.splice(0, 1)[0];
        key.refreshTokensUsed.push(device.refreshToken);
      }

      const tokens = (await KeyModel.findOneAndUpdate(
        {
          account,
        },
        key,
        { new: true },
      ))!;
      return tokens.devices[tokens.devices.length - 1];
    } catch (error) {
      console.log('updateRefreshToken::', error);
      throw error;
    }
  }

  static getKeyPair(account: Types.ObjectId): Promise<{ publicKey: string; privateKey: string } | null> {
    return KeyModel.findOne({ account }, { _id: 0, publicKey: 1, privateKey: 1 }).lean();
  }

  static findByAccountId(accountId: Types.ObjectId) {
    return KeyModel.findOne({ account: accountId }).lean();
  }

  static findByDeviceAccountId(deviceId: Types.ObjectId, accountId: Types.ObjectId) {
    return KeyModel.findOne({ 'devices._id': deviceId, account: accountId }).lean();
  }

  static addToRefreshTokensUsed(_id: Types.ObjectId, refreshToken: string) {
    return KeyModel.findOneAndUpdate(
      { _id },
      { $addToSet: { refreshTokensUsed: refreshToken }, $pull: { devices: { refreshToken: refreshToken } } },
      { new: true },
    ).lean();
  }
  static findByDeviceIdAndRefreshToken(deviceId: Types.ObjectId, refreshToken: string) {
    return KeyModel.findOne({ 'devices._id': deviceId, 'devices.refreshToken': refreshToken }).lean();
  }

  static findInRefreshTokensUsed(refreshToken: string) {
    return KeyModel.findOne({ refreshTokensUsed: refreshToken }).lean();
  }

  static removeAllRefreshToken(_id: Types.ObjectId) {
    return KeyModel.findOneAndUpdate({ _id }, { devices: [] }, { new: true }).lean();
  }

  static async removeDevice(account: Types.ObjectId, id: Types.ObjectId): Promise<Types.ObjectId> {
    await KeyModel.updateOne(
      {
        account,
      },
      {
        $pull: {
          devices: { _id: id },
        },
      },
    );
    return id;
  }
}
