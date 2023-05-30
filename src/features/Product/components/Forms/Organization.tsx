import { Option, Select } from '@material-tailwind/react';
import { TSuccessResponse } from '@server/schema/response.schema';
import Card from '@src/components/Card';
import instance from '@src/utils/instance';
import useSWR from 'swr';
import { ProductCategory } from '../../Category/types';
import { useProductStore } from '../../store';

const ProductOrganization = () => {
  const { data: categories } = useSWR('/products/categories', (url) =>
    instance.get<TSuccessResponse<ProductCategory[]>>(url).then(({ data }) => data.metadata),
  );
  const { product, setCategoryId } = useProductStore((state) => state);
  const { categoryId } = product;
  return (
    <Card>
      <Card.Section title="Product organization">
        <Select
          label="Product category"
          variant="outlined"
          value={categoryId}
          onChange={(value) => setCategoryId(value || '')}
        >
          {categories?.map(({ _id, title }) => (
            <Option key={_id} value={_id}>
              {title}
            </Option>
          )) || <></>}
        </Select>
      </Card.Section>
    </Card>
  );
};

export default ProductOrganization;
