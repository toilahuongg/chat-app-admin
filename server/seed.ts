import AccountService from '@server/services/account.service';

import('@server/dbs/init.mongodb');
export const handleSeeding = async () => {
  for (let i = 1; i <= 100; i++) {
    await AccountService.create(
      {
        username: 'admin' + i,
        email: `admin${i}@gmail.com`,
        password: '123456',
        confirmPassword: '123456',
      },
      [],
    );
  }
};

handleSeeding();
