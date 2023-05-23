import { Input } from '@material-tailwind/react';
import Card from '@src/components/Card';
import { useProductStore } from '../store';

const ProductPrice = () => {
  const { product, setCompareAtPrice, setPrice } = useProductStore((state) => state);
  const { compareAtPrice, price } = product;
  return (
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
  );
};

export default ProductPrice;
