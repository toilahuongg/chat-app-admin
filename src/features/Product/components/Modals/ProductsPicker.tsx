import {
  Avatar,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react';
import { TSuccessResponse } from '@server/schema/response.schema';
import instance from '@src/utils/instance';
import useSWR from 'swr';
import { Product } from '../../types';
import { useEffect, useState } from 'react';

type TProps = {
  open: boolean;
  selected: Partial<Product>[];
  onSelect: (selected: Partial<Product>[]) => void;
  toggleOpen: () => void;
};
const ModalProductsPicker: React.FC<TProps> = ({ open, selected, onSelect, toggleOpen }) => {
  const { data: products } = useSWR('/products', (url) =>
    instance.get<TSuccessResponse<Product[]>>(url).then(({ data }) => data.metadata),
  );

  const [itemsSelected, setItemsSelected] = useState([...selected]);

  useEffect(() => setItemsSelected(selected), [selected]);

  const handleChooseProduct = (product: Product) => {
    setItemsSelected((items) => {
      const idx = items.findIndex((item) => item._id === product._id);
      if (idx >= 0) items.splice(idx, 1);
      else items.push(product);
      return [...items];
    });
  };

  const handleAdd = () => {
    onSelect(itemsSelected);
    toggleOpen();
  };
  return (
    <Dialog open={open} handler={toggleOpen}>
      <DialogHeader>Products picker</DialogHeader>
      <DialogBody divider>
        <List>
          {products?.slice(0, 5)?.map((product) => {
            const { _id, media, title, description } = product;
            return (
              <ListItem
                key={_id}
                onClick={() => handleChooseProduct(product)}
                selected={!!itemsSelected.find((item) => item._id === _id)}
              >
                <ListItemPrefix>
                  <Avatar variant="rounded" alt="candice" src={media[0]} />
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {title}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    {description.substring(0, 50)}
                  </Typography>
                </div>
              </ListItem>
            );
          })}
        </List>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={toggleOpen} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleAdd}>
          <span>Add</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalProductsPicker;
