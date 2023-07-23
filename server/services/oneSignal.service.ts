import appConfig from '@server/configs/app.config';
import KeyModel from '@server/models/key.model';
import { Types } from 'mongoose';
import { Client } from 'onesignal-node';

export default class OneSignal {
  private static instance: OneSignal;
  private client!: Client;

  constructor() {
    this.init();
  }
  async init() {
    const client = new Client(appConfig.app.oneSignalAppId, appConfig.app.oneSignalAPIKey);
    this.client = client;
  }

  getClient() {
    return this.client;
  }

  static getInstance() {
    if (!OneSignal.instance) {
      OneSignal.instance = new OneSignal();
    }
    return OneSignal.instance;
  }

  static async createNotification(
    heading: string,
    content: string,
    data: Record<string, string>,
    accountIds: Types.ObjectId[],
  ) {
    const client = OneSignal.getInstance().getClient();
    const Keys = await KeyModel.find({ account: { $in: accountIds } }).lean();
    const deviceIds: string[] = [];
    Keys.forEach(({ devices }) => {
      devices.forEach(({ _id }) => deviceIds.push(_id!.toString()));
    });
    if (deviceIds.length === 0) return null;
    return client.createNotification({
      android_channel_id: appConfig.app.oneSignalChannelID,
      headings: {
        en: heading,
      },
      contents: {
        en: content,
      },
      include_external_user_ids: deviceIds,
      data,
    });
  }
}
