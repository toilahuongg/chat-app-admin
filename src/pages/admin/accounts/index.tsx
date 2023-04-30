'use client';

import { SCOPES } from '@server/utils/scopes';
import Button from '@src/components/Button';
import ListAccounts from '@src/features/Account/List';
import { withScopes } from '@src/features/Auth/withScopes';

const AccountPage = () => {
  return (
    <div>
      <Button> Oke </Button>
      <ListAccounts />
    </div>
  );
};

export default withScopes(AccountPage, [SCOPES.READ_ACCOUNTS, SCOPES.WRITE_ACCOUNTS]);
