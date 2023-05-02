import fetch from 'node-fetch';
import appConfig from '@server/configs/app.config';
import { z } from 'zod';
import {
  changeInformationValidator,
  changePasswordValidator,
  loginValidator,
  createAccountValidator,
} from '@server/validators/account.validator';
import { makeid } from '@server/helpers';
import mongoose, { Types } from 'mongoose';
import HEADERS from '@server/utils/headers';
import KeyService from '@server/services/key.service';

const {
  db: { host, name, pass, port, user },
} = appConfig;

const PORT = appConfig.app.port;
const uri = `http://localhost:${PORT}/api/v1`;
const randomId = makeid(10);
let accountId = '',
  accessToken = '',
  refreshToken = '',
  deviceId = '';
const badResponse = (message: string) => ({
  status: 'error',
  statusCode: 400,
  message: message,
});

const connectString = `mongodb://${host}:${port}/${name}?authSource=admin`;
beforeEach(async () => {
  await mongoose.connect(connectString, {
    user,
    pass,
    maxPoolSize: 50,
  });
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe('signUpUser', () => {
  const bodySchema = createAccountValidator.shape.body;
  const request = (body: Partial<z.infer<typeof bodySchema>>) =>
    fetch(`${uri}/accounts/signup`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

  it('should return message when the username is not provided', async () => {
    const result = await request({});
    expect(result).toEqual(badResponse('Username is required'));
  });

  it('should return message when username length is less than 5 characters', async () => {
    const result = await request({
      username: '1234',
    });
    expect(result).toEqual(badResponse('Username must be 5 or more characters long'));
  });

  it('should return message when username length is more than 32 characters', async () => {
    const result = await request({
      username: 'toilahuongtoilahuongtoilahuongtoilahuongtoilahuongtoilahuong',
    });
    expect(result).toEqual(badResponse('Username must be 32 or fewer characters long'));
  });

  it('should return message when the email is not provided', async () => {
    const result = await request({
      username: '123456',
    });
    expect(result).toEqual(badResponse('Email is required'));
  });

  it('should return message when the email is not valid', async () => {
    const result = await request({
      username: '123456',
      email: '123@gm',
    });
    expect(result).toEqual(badResponse('Invalid email address'));
  });

  it('should return message when password is not provided', async () => {
    const result = await request({
      username: '123456',
      email: '123@gmail.com',
    });
    expect(result).toEqual(badResponse('Password is required'));
  });

  it('should return message when password length is less than 6 characters', async () => {
    const result = await request({
      username: '123456',
      email: '123@gmail.com',
      password: '12345',
    });
    expect(result).toEqual(badResponse('Password must be 6 or more characters long'));
  });

  it('should return message when confirm password is not provided', async () => {
    const result = await request({
      username: '123456',
      email: '123@gmail.com',
      password: '123456',
    });
    expect(result).toEqual(badResponse('Confirm password is required'));
  });

  it("should return message when passwords don't match", async () => {
    const result = await request({
      username: '123456',
      email: '123@gmail.com',
      password: '123456',
      confirmPassword: '1234567',
    });
    expect(result).toEqual(badResponse("Passwords don't match"));
  });

  it('should return message when registered success', async () => {
    const result = await request({
      username: randomId,
      email: `${randomId}@gmail.com`,
      password: '123456',
      confirmPassword: '123456',
    });
    expect(result.statusCode).toBe(201);
  });

  it('should return message when username or email exists', async () => {
    const result = await request({
      username: randomId,
      email: `${randomId}@gmail.com`,
      password: '123456',
      confirmPassword: '123456',
    });
    expect(result.statusCode).toBe(409);
  });
});

describe('loginUser', () => {
  const bodySchema = loginValidator.shape.body;
  const request = (body: Partial<z.infer<typeof bodySchema>>) =>
    fetch(`${uri}/accounts/login`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

  it('should return message when the account is not provided', async () => {
    const result = await request({});
    expect(result).toEqual(badResponse('Username or email is required'));
  });

  it('should return message when the password is not provided', async () => {
    const result = await request({
      account: randomId,
    });
    expect(result).toEqual(badResponse('Password is required'));
  });

  it('should return message when account or password incorrect', async () => {
    const result = await request({
      account: randomId,
      password: '1234567',
    });
    expect(result.statusCode).toBe(401);
  });

  it('should return message when account or password correct', async () => {
    const result = await request({
      account: randomId,
      password: '123456',
    });
    accountId = result.metadata.user._id;
    accessToken = result.metadata.tokens.accessToken;
    refreshToken = result.metadata.tokens.refreshToken;
    deviceId = result.metadata.deviceId;
    expect(result.statusCode).toBe(200);
  });
});

describe('refreshToken', () => {
  const request = () =>
    fetch(`${uri}/accounts/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [HEADERS.CLIENT_ID]: accountId,
        [HEADERS.DEVICE_ID]: deviceId,
        [HEADERS.REFRESH_TOKEN]: refreshToken,
      },
    }).then((res) => res.json());
  it('should return message when refreshToken success', async () => {
    const result = await request();
    expect(result.statusCode).toBe(200);
  });
});

describe('change-password', () => {
  const request = (body: Partial<z.infer<typeof changePasswordValidator.shape.body>>) =>
    fetch(`${uri}/accounts/change-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        [HEADERS.CLIENT_ID]: accountId,
        [HEADERS.AUTHORIZATION]: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  it('should return message when change password success', async () => {
    const result = await request({
      oldPassword: '123456',
      newPassword: '1234567',
      confirmPassword: '1234567',
    });
    expect(result.statusCode).toBe(200);
  });
});

describe('change-information', () => {
  const request = (body: Partial<z.infer<typeof changeInformationValidator.shape.body>>) =>
    fetch(`${uri}/accounts/change-information`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        [HEADERS.CLIENT_ID]: accountId,
        [HEADERS.DEVICE_ID]: deviceId,
        [HEADERS.AUTHORIZATION]: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());

  it('should return message when change information success', async () => {
    const result = await request({
      firstName: 'Vu Ba',
      lastName: 'Huong',
    });
    expect(result.statusCode).toBe(200);
  });
});

describe('logout', () => {
  const request = () =>
    fetch(`${uri}/accounts/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        [HEADERS.CLIENT_ID]: accountId,
        [HEADERS.DEVICE_ID]: deviceId,
        [HEADERS.AUTHORIZATION]: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  it('should return message when logout success', async () => {
    const result = await request();
    expect(result.statusCode).toBe(200);
  });

  it("should return error when refreshToken don't remove", async () => {
    const result = await KeyService.findByDeviceIdAndRefreshToken(new Types.ObjectId(deviceId), refreshToken);
    expect(!!result).toBe(false);
  });
});
