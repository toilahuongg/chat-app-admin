import { Option, Select, Spinner } from '@material-tailwind/react';
import { TSuccessResponse } from '@server/schema/response.schema';
import Card from '@src/components/Card';
import instance from '@src/utils/instance';
import useSWR from 'swr';
import { ProductCategory } from '../../Category/types';
import { useProductStore } from '../../store';

const ProductOrganization = () => {
  const { data: categories, isLoading } = useSWR('/product-categories', (url) =>
    instance.get<TSuccessResponse<ProductCategory[]>>(url).then(({ data }) => data.metadata),
  );
  const { product, setCategoryId } = useProductStore((state) => state);
  const { categoryId } = product;

  return (
    <Card>
      <Card.Section title="Product organization">
        {isLoading ? (
          <Spinner />
        ) : (
          <Select
            label="Product category"
            variant="outlined"
            value={categoryId}
            onChange={(value) => setCategoryId(value as string)}
          >
            {/* <Option value="">Chọn danh mục</Option> */}
            {categories?.map(({ _id, title }) => (
              <Option key={_id} value={_id}>
                {title}
              </Option>
            ))}
          </Select>
        )}
      </Card.Section>
    </Card>
  );
};

export default ProductOrganization;
