import { Typography } from '@material-tailwind/react';
import { TSuccessResponse } from '@server/schema/response.schema';
import { SCOPES } from '@server/utils/scopes';
import Card from '@src/components/Card';
import ListTopAccounts from '@src/features/Analytics/Account/List';
import ListTopProducts from '@src/features/Analytics/Product/List';
import { withScopes } from '@src/features/Auth/withScopes';
import { Order } from '@src/features/Order/types';
import { Product } from '@src/features/Product/types';
import instance from '@src/utils/instance';
import useSWR from 'swr';

const AdminPage = () => {
  const { data: orders } = useSWR('/orders', (url) =>
    instance.get<TSuccessResponse<Order[]>>(url).then(({ data }) => data.metadata),
  );

  const { data: products } = useSWR('/products', (url) =>
    instance.get<TSuccessResponse<Product[]>>(url).then(({ data }) => data.metadata),
  );

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <Card.Section>
            <Typography variant="h3" className="text-4xl" color="blue" textGradient>
              {products?.length || 0}
            </Typography>
            <Typography as="paragraph" className="mt-2 text-2xl font-medium">
              Sản phẩm
            </Typography>
          </Card.Section>
        </Card>
        <Card>
          <Card.Section>
            <Typography variant="h3" className="text-4xl" color="red" textGradient>
              {orders?.length || 0}
            </Typography>
            <Typography as="paragraph" className="mt-2 text-2xl font-medium">
              Đơn hàng
            </Typography>
          </Card.Section>
        </Card>
        <Card>
          <Card.Section>
            <Typography variant="h3" className="text-4xl" color="green" textGradient>
              100
            </Typography>
            <Typography as="paragraph" className="mt-2 text-2xl font-medium">
              Tài khoản
            </Typography>
          </Card.Section>
        </Card>
        <Card>
          <Card.Section>
            <Typography variant="h3" className="text-4xl" color="blue-gray" textGradient>
              13
            </Typography>
            <Typography as="paragraph" className="mt-2 text-2xl font-medium">
              Bài viết
            </Typography>
          </Card.Section>
        </Card>
      </div>
      <div className="mt-20">
        <ListTopAccounts />
      </div>
      <div className="mt-4">
        <ListTopProducts />
      </div>
    </div>
  );
};

export default withScopes(AdminPage, [SCOPES.ACCESS_ADMINISTRATION]);
