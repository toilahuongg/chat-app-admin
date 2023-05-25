import { Option, Select } from '@material-tailwind/react';
import Card from '@src/components/Card';
import { OPTIONS_STATUS } from '../../constants';
import { useProductStore } from '../../store';
import { ProductStatus } from '../../types';

const ProductStatus = () => {
  const { product, setStatus } = useProductStore((state) => state);
  const { status } = product;
  return (
    <Card>
      <Card.Section title="Status">
        <Select
          labelProps={{
            className: 'before:w-full before:mr-0 before:rounded-tr-md after:hidden',
          }}
          value={status}
          onChange={(value) => setStatus(value as ProductStatus)}
        >
          {OPTIONS_STATUS.map(({ label, value }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Card.Section>
    </Card>
  );
};

export default ProductStatus;
