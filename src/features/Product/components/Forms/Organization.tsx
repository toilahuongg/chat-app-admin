import { Select } from '@material-tailwind/react';
import Card from '@src/components/Card';

const ProductOrganization = () => {
  return (
    <Card>
      <Card.Section title="Product organization">
        <Select label="Product category" variant="outlined">
          {''}
        </Select>
      </Card.Section>
    </Card>
  );
};

export default ProductOrganization;
