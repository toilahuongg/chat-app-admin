import RoleModel from '@server/models/role.model';
import { SCOPES, TScopes } from './scopes';
import AccountService from '@server/services/account.service';
import AccountModel from '@server/models/account.model';

import('@server/dbs/init.mongodb');
export const handleInstallApp = async () => {
  const scopes = [];
  for (const key of Object.getOwnPropertyNames(SCOPES)) {
    scopes.push(SCOPES[key as keyof TScopes]);
  }

  const adminRole = await RoleModel.create({
    name: 'Administrator',
    desc: 'Full control',
    scopes: scopes,
  });

  await RoleModel.create({
    name: 'Member',
    desc: 'No control',
    scopes: [],
  });

  const { user } = await AccountService.signUp(
    {
      username: 'admin',
      email: 'admin@gmail.com',
      password: '123456',
      confirmPassword: '123456',
    },
    {
      os: 'Test',
      browser: 'Test',
      ipAddress: 'Test',
      refreshToken: '',
    },
  );
  await AccountModel.updateOne({ _id: user._id }, { roles: [adminRole._id] });
};

handleInstallApp();
