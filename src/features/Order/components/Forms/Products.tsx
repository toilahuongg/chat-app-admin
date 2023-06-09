import { TrashIcon } from '@heroicons/react/24/solid';
import { Avatar, Button, IconButton, Input, Typography } from '@material-tailwind/react';
import { TSuccessResponse } from '@server/schema/response.schema';
import { Product } from '@src/features/Product/types';
import { formatPrice } from '@src/utils/formatPrice';
import instance from '@src/utils/instance';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { useOrderStore } from '../../store';
import Card from '@src/components/Card';
import ModalProductsPicker from '@src/features/Product/components/Modals/ProductsPicker';

const ProductsOrder = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen((isOpen) => !isOpen), []);
  const { order, handleAddProducts, handleChangeQuantity, setTotal } = useOrderStore((state) => state);

  const { products } = order;

  const { data: items } = useSWR('/products', (url) =>
    instance.get<TSuccessResponse<Product[]>>(url).then(({ data }) => data.metadata),
  );

  const listProduct = useMemo(
    () =>
      products
        .map((p) => {
          const product = items?.find(({ _id }) => _id === p.productId);
          if (!product) return null;
          const { _id, title, media } = product;
          const { quantity, price } = p;
          return {
            _id,
            title,
            quantity,
            price,
            thumbnail: media[0],
          };
        })
        .filter((p) => !!p),
    [items, products],
  );

  const total = useMemo(
    () =>
      listProduct.reduce((sum, p) => {
        return sum + (p?.price || 0) * (p?.quantity || 0);
      }, 0),
    [listProduct],
  );

  useEffect(() => {
    setTotal(total);
  }, [total, setTotal]);

  return (
    <Card>
      <Card.Section
        title="Sản phẩm"
        actions={
          <Button size="sm" onClick={toggleOpen}>
            Thêm
          </Button>
        }
      >
        <div className="flex flex-col gap-4">
          {listProduct.map((product) => (
            <div key={product?._id} className="flex gap-4 items-center">
              <Avatar variant="rounded" alt="candice" size="xl" src={product?.thumbnail} />
              <div>
                <Typography variant="h6" color="blue-gray">
                  {product?.title}
                </Typography>
                <Typography variant="small" color="gray" className="font-normal mt-2">
                  <Input
                    label="Quantity"
                    type="number"
                    variant="outlined"
                    value={product?.quantity || 0}
                    onChange={(e) => handleChangeQuantity(product?._id || '', +e.currentTarget.value)}
                    autoComplete="off"
                  />
                </Typography>
              </div>
              <div className="flex items-center justify-center w-56">
                <Typography color="gray" className="text-2xl font-medium">
                  {formatPrice((product?.price || 0) * (product?.quantity || 0))}
                </Typography>
              </div>
              <div className="flex flex-1 justify-end">
                <IconButton size="sm" variant="text" color="red" className="flex items-center gap-2" onClick={() => {}}>
                  <TrashIcon strokeWidth={2} className="h-5 w-5" />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Typography variant="small" color="blue" className="text-2xl font-medium">
            Tổng: {formatPrice(total)}
          </Typography>
        </div>
      </Card.Section>
      <ModalProductsPicker
        open={open}
        toggleOpen={toggleOpen}
        selected={products.map(({ productId, price }) => ({ _id: productId, compareAtPrice: price }))}
        onSelect={(selected) =>
          handleAddProducts(
            selected.map((item) => ({ productId: item._id!, price: item.compareAtPrice!, quantity: 1 })),
          )
        }
      />
    </Card>
  );
};

export default ProductsOrder;
