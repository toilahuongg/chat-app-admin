import { Card, CardBody } from '@material-tailwind/react';
import { SCOPES } from '@server/utils/scopes';
import Button from '@src/components/Button';
import Page from '@src/components/Page';
import ListAccounts from '@src/features/Account/List';
import { withScopes } from '@src/features/Auth/withScopes';
import Link from 'next/link';
import { Suspense } from 'react';

const AccountPage = () => {
  return (
    <Page
      title="Account list"
      headerActions={
        <Link href="/admin/accounts/create">
          <Button>New account</Button>
        </Link>
      }
    >
      <Card>
        <CardBody>
          <Suspense fallback="Loading ...">
            <ListAccounts />
          </Suspense>
        </CardBody>
      </Card>
    </Page>
  );
};

export default withScopes(AccountPage, [SCOPES.READ_ACCOUNTS, SCOPES.WRITE_ACCOUNTS]);
