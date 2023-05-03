import AccountService from '@server/services/account.service';
import { makeid } from '@server/helpers';

import('@server/dbs/init.mongodb');

const seed = async () => {
  for (let i = 0; i < 100; i++) {
    const id = makeid(8);
    await AccountService.signUp(
      {
        username: id,
        email: `${id}@gmail.com`,
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
  }
};

seed();
