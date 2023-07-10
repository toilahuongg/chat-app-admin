import { AuthFailureError } from '@server/core/error.response';
import { detectException } from '.';
import KeyService from '@server/services/key.service';
import { Types } from 'mongoose';
import { generateToken, verifyToken } from '@server/helpers/token';
import { TAccountEncrypt } from '@server/schema/account.schema';
import HEADERS from '@server/utils/headers';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import appConfig from '@server/configs/app.config';

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

  if (req.headers[HEADERS.REFRESH_TOKEN]) {
    try {
      const deviceId = req.headers[HEADERS.DEVICE_ID] as string;
      if (!deviceId) throw new AuthFailureError('Missing Device ID!');

      const foundKey = await KeyService.findByDeviceAccountId(
        new Types.ObjectId(deviceId),
        new Types.ObjectId(accountId),
      );
      if (!foundKey) throw new AuthFailureError('Invalid Device ID or Client ID!');

      const refreshToken = req.headers[HEADERS.REFRESH_TOKEN] as string;
      let decoded: TAccountEncrypt;
      try {
        decoded = (await verifyToken(refreshToken, foundKey.publicKey)) as TAccountEncrypt;
      } catch (error) {
        console.log('Decoded refreshToken::', error);
        await KeyService.addToRefreshTokensUsed(foundKey._id, refreshToken);
        throw new AuthFailureError('Invalid RefreshToken!');
      }
      if (decoded.accountId !== accountId) throw new AuthFailureError('Invalid Client ID');
      req.accountId = new Types.ObjectId(accountId);
      req.deviceId = new Types.ObjectId(deviceId);
      req.refreshToken = refreshToken;
      return next();
    } catch (error) {
      throw error;
    }
  }
  const foundKey = await KeyService.findByAccountId(new Types.ObjectId(accountId));
  if (!foundKey) throw new AuthFailureError('Invalid Client ID!');

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
    decoded = await verifyToken<TAccountEncrypt>(accessToken, foundKey.publicKey);
  } catch (error) {
    console.log('Decoded token::', error);
    throw new AuthFailureError('Invalid AccessToken!');
  }

  if (accountId !== decoded.accountId) throw new AuthFailureError('Invalid Client ID');
  req.accountId = new Types.ObjectId(accountId);
  return next();
});

export const authSocket = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError | undefined) => void,
) => {
  const { accessToken, refreshToken, deviceId, clientId } = socket.handshake.auth as { [key: string]: string };
  if (!clientId) throw new AuthFailureError('Missing Client ID!');
  const foundKey = await KeyService.findByAccountId(new Types.ObjectId(clientId));
  if (!foundKey) throw new AuthFailureError('Invalid Client ID!');

  if (!accessToken) throw new AuthFailureError('Missing AccessToken!');

  let decoded: TAccountEncrypt;
  try {
    try {
      decoded = await verifyToken<TAccountEncrypt>(accessToken, foundKey.publicKey);
    } catch (error) {
      if (!deviceId) throw new AuthFailureError('Missing Device ID!');
      const fKey = await KeyService.findByDeviceAccountId(new Types.ObjectId(deviceId), new Types.ObjectId(clientId));
      if (!fKey) throw new AuthFailureError('Invalid Device ID or Client ID!');
      try {
        decoded = (await verifyToken(refreshToken, foundKey.publicKey)) as TAccountEncrypt;
      } catch (error) {
        console.log('Decoded refreshToken::', error);
        await KeyService.addToRefreshTokensUsed(foundKey._id, refreshToken);
        throw new AuthFailureError('Invalid RefreshToken!');
      }
      const { accountId, username } = decoded;
      socket.data.newAccessToken = generateToken(
        { accountId, username },
        foundKey.privateKey,
        appConfig.app.tokenExpiresIn,
      );
    }
  } catch (error) {
    console.log('Decoded token::', error);
    throw new AuthFailureError('Invalid AccessToken!');
  }

  if (clientId !== decoded.accountId) throw new AuthFailureError('Invalid Client ID');
  socket.data.accountId = new Types.ObjectId(clientId);
  return next();
};
