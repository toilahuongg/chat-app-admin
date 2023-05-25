import { Input, Textarea } from '@material-tailwind/react';
import Card from '@src/components/Card';
import { useProductStore } from '../../store';

const ProductTitleDescription = () => {
  const { product, setDescription, setTitle } = useProductStore((state) => state);
  const { description, title } = product;
  return (
    <Card>
      <Card.Section className="flex flex-col gap-4">
        <Input
          label="Title"
          variant="outlined"
          size="lg"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          autoComplete="product-title"
        />
        <Textarea
          label="Description"
          variant="outlined"
          size="lg"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          autoComplete="product-desc"
        />
      </Card.Section>
    </Card>
  );
};

export default ProductTitleDescription;
