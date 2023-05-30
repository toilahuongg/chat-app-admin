import { Card, CardBody } from '@material-tailwind/react';
import { SCOPES } from '@server/utils/scopes';
import Button from '@src/components/Button';
import Page from '@src/components/Page';
import { withScopes } from '@src/features/Auth/withScopes';
import ListRoles from '@src/features/Role/components/List';
import Link from 'next/link';
import { Suspense } from 'react';

const RolePage = () => {
  return (
    <Page
      title="Danh sách quyền"
      headerActions={
        <Link href="/admin/roles/create">
          <Button>Thêm quyền mới</Button>
        </Link>
      }
    >
      <Card>
        <CardBody>
          <Suspense fallback="Loading ...">
            <ListRoles />
          </Suspense>
        </CardBody>
      </Card>
    </Page>
  );
};

export default withScopes(RolePage, [SCOPES.READ_ROLES, SCOPES.WRITE_ROLES]);
