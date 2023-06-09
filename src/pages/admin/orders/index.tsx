import { Card, CardBody } from '@material-tailwind/react';
import { SCOPES } from '@server/utils/scopes';
import Button from '@src/components/Button';
import Page from '@src/components/Page';
import { withScopes } from '@src/features/Auth/withScopes';
import ListOrders from '@src/features/Order/components/List';
import Link from 'next/link';
import { Suspense } from 'react';

const OrderPage = () => {
  return (
    <Page
      title="Đơn hàng"
      headerActions={
        <Link href="/admin/orders/create">
          <Button>Thêm mới</Button>
        </Link>
      }
    >
      <Card>
        <CardBody>
          <Suspense fallback="Loading ...">
            <ListOrders />
          </Suspense>
        </CardBody>
      </Card>
    </Page>
  );
};

export default withScopes(OrderPage, [SCOPES.READ_ORDERS, SCOPES.WRITE_ORDERS]);
