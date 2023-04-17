import appConfig from '@server/configs/app.config';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export const generateKey = (): Promise<{ publicKey: string; privateKey: string }> =>
  new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      'rsa',
      {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: appConfig.app.secretKey,
        },
      },
      (err, publicKey, privateKey) => {
        if (err) reject(err);
        resolve({ publicKey, privateKey });
      },
    );
  });
