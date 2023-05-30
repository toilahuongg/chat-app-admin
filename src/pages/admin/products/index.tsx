import { Card, CardBody } from '@material-tailwind/react';
import { SCOPES } from '@server/utils/scopes';
import Button from '@src/components/Button';
import Page from '@src/components/Page';
import { withScopes } from '@src/features/Auth/withScopes';
import ListProducts from '@src/features/Product/components/List';
import Link from 'next/link';
import { Suspense } from 'react';

const RolePage = () => {
  return (
    <Page
      title="Sản phẩm"
      headerActions={
        <Link href="/admin/products/create">
          <Button>Thêm mới</Button>
        </Link>
      }
    >
      <Card>
        <CardBody>
          <Suspense fallback="Loading ...">
            <ListProducts />
          </Suspense>
        </CardBody>
      </Card>
    </Page>
  );
};

export default withScopes(RolePage, [SCOPES.READ_ROLES, SCOPES.WRITE_ROLES]);
