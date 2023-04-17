import { AuthFailureError } from '@server/core/error.response';
import { detectException } from '.';
import KeyService from '@server/services/key.service';
import { Types } from 'mongoose';
import { verifyToken } from '@server/helpers/token';
import { TAccountEncrypt } from '@server/schema/account.schema';
import HEADERS from '@server/utils/headers';

/*
  - Check accountId
  - Check device-id
  - Get accessToken
  - Get keyStore
  - Decode token
  - Check keyStore with this accountId
  - OK => next()
*/
export const authentication = detectException(async (req, res, next) => {
  const accountId = req.headers[HEADERS.CLIENT_ID] as string;
  if (!accountId) throw new AuthFailureError('Missing Client ID!');

  const deviceId = req.headers[HEADERS.DEVICE_ID] as string;
  if (!deviceId) throw new AuthFailureError('Missing Device ID!');

  const foundKey = await KeyService.findByDeviceAccountId(new Types.ObjectId(deviceId), new Types.ObjectId(accountId));
  if (!foundKey) throw new AuthFailureError('Invalid Device ID or Client ID!');

  if (req.headers[HEADERS.REFRESH_TOKEN]) {
    try {
      const refreshToken = req.headers[HEADERS.REFRESH_TOKEN] as string;
      const decoded = (await verifyToken(refreshToken, foundKey.publicKey)) as TAccountEncrypt;
      if (decoded.accountId !== accountId) throw new AuthFailureError('Invalid Client ID');
      req.accountId = new Types.ObjectId(accountId);
      req.deviceId = new Types.ObjectId(deviceId);
      req.refreshToken = refreshToken;
      return next();
    } catch (error) {
      throw error;
    }
  }

  const bearerToken = req.headers[HEADERS.AUTHORIZATION] as string;
  if (!bearerToken || !bearerToken.includes('Bearer ')) throw new AuthFailureError('Missing Bearer AccessToken!');

  let accessToken = '';
  try {
    accessToken = bearerToken.split(' ')[1];
  } catch (error) {
    console.log('Detech accessToken::', error);
    throw new AuthFailureError('Invalid AccessToken!');
  }

  let decoded: TAccountEncrypt;
  try {
    decoded = (await verifyToken(accessToken, foundKey.publicKey)) as TAccountEncrypt;
  } catch (error) {
    console.log('Decoded token::', error);
    throw new AuthFailureError('Invalid AccessToken!');
  }

  if (accountId !== decoded.accountId) throw new AuthFailureError('Invalid Client ID');
  req.accountId = new Types.ObjectId(accountId);
  req.deviceId = new Types.ObjectId(deviceId);
  return next();
});
