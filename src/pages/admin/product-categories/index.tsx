import { Card, CardBody } from '@material-tailwind/react';
import { SCOPES } from '@server/utils/scopes';
import Button from '@src/components/Button';
import Page from '@src/components/Page';
import { withScopes } from '@src/features/Auth/withScopes';
import ListProductCategories from '@src/features/Product/Category/components/List';
import Link from 'next/link';
import { Suspense } from 'react';

const ProductCategoryPage = () => {
  return (
    <Page
      title="Danh mục sản phẩm"
      headerActions={
        <Link href="/admin/product-categories/create">
          <Button>Tạo mới</Button>
        </Link>
      }
    >
      <Card>
        <CardBody>
          <Suspense fallback="Loading ...">
            <ListProductCategories />
          </Suspense>
        </CardBody>
      </Card>
    </Page>
  );
};

export default withScopes(ProductCategoryPage, [SCOPES.READ_PRODUCT_CATEGORIES, SCOPES.WRITE_PRODUCT_CATEGORIES]);
