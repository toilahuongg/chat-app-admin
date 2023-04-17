import express from 'express';
import useragent from 'express-useragent';
import requestIP from 'request-ip';
import { TDevice } from '@server/schema/key.schema';

const detectDevice = express.Router();
detectDevice.use(useragent.express());
detectDevice.use((req, res, next) => {
  const { browser, os } = req.useragent!;
  const ipAddress = requestIP.getClientIp(req)!;

  const device: TDevice = {
    browser,
    os,
    ipAddress,
    refreshToken: '',
  };
  req.device = device;
  next();
});

export default detectDevice;
