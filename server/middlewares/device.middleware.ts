import express from 'express';
import requestIP from 'request-ip';
import { TDevice } from '@server/schema/key.schema';
import { Types } from 'mongoose';
import HEADERS from '@server/utils/headers';
import { ForbiddenError } from '@server/core/error.response';

const detectDevice = express.Router();
detectDevice.use((req, res, next) => {
  const os = req.headers[HEADERS.DEVICE_OS] as string;
  const osVersion = req.headers[HEADERS.DEVICE_OS_VERSION] as string;
  const model = req.headers[HEADERS.DEVICE_MODEL] as string;
  const ipAddress = requestIP.getClientIp(req)!;
  if (!os || !osVersion || !model) throw new ForbiddenError('We failed to detect your device');
  const device: TDevice = {
    _id: new Types.ObjectId(),
    model,
    osVersion,
    os,
    ipAddress,
    refreshToken: '',
  };
  req.device = device;
  next();
});

export default detectDevice;
