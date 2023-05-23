import { Input, Textarea } from '@material-tailwind/react';
import Card from '@src/components/Card';
import VariantsForm from './Variants';
import { useProductStore } from '../store';

const EditProductForm = () => {
  const { product, setCompareAtPrice, setDescription, setPrice, setSlug, setStatus, setTitle } = useProductStore(
    (state) => state,
  );
  const { description, compareAtPrice, price, slug, status, title } = product;
  return (
    <div className="flex gap-4">
      <div className="flex-1 flex flex-col gap-4">
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
        <Card>
          <Card.Section title="Media">123</Card.Section>
        </Card>
        <Card>
          <Card.Section title="Pricing">
            <div className="max-w-lg">
              <div className="grid grid-cols-2 gap-4 xs:grid-cols-1">
                <Input
                  type="number"
                  label="Price"
                  variant="outlined"
                  size="lg"
                  value={price}
                  onChange={(e) => setPrice(+e.currentTarget.value)}
                  autoComplete="price"
                  icon={<span>₫</span>}
                />
                <Input
                  type="number"
                  label="Compare-at price"
                  variant="outlined"
                  size="lg"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(+e.currentTarget.value)}
                  autoComplete="compare-at-price"
                  icon={<span>₫</span>}
                />
              </div>
            </div>
          </Card.Section>
        </Card>
        <VariantsForm />
      </div>
      <div className="w-80 flex flex-col gap-4">
        <Card>
          <Card.Section title="Status">123</Card.Section>
        </Card>
      </div>
    </div>
  );
};

export default EditProductForm;
