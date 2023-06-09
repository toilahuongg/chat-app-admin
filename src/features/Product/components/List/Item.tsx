import { PencilSquareIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { Avatar, IconButton } from '@material-tailwind/react';
import DataTable from '@src/components/DataTable';
import { Product } from '../../types';

type ProductItem = {
  product: Product;
  isAccessWrite: boolean;
  onDelete: () => void;
};
const ProductItem: React.FC<ProductItem> = ({ product, isAccessWrite, onDelete }) => {
  const { _id, title, description, media } = product;
  const router = useRouter();
  return (
    <DataTable.Row className="group">
      <DataTable.Cell className="w-28">
        <Avatar src={media[0]} alt={title} withBorder={true} className="p-0.5" variant="rounded" size="xl" />
      </DataTable.Cell>
      <DataTable.Cell className="w-80"> {title} </DataTable.Cell>
      <DataTable.Cell> {description.substring(0, 100)}</DataTable.Cell>
      {isAccessWrite && (
        <DataTable.Cell className="flex justify-end gap-1 opacity-0 group-hover:opacity-100">
          <IconButton
            size="sm"
            variant="outlined"
            color="green"
            className="flex items-center gap-2"
            onClick={() => router.push('/admin/products/' + _id)}
          >
            <PencilSquareIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
          <IconButton size="sm" variant="outlined" className="flex items-center gap-2">
            <DocumentDuplicateIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
          <IconButton size="sm" color="red" className="flex items-center gap-2" onClick={onDelete}>
            <TrashIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </DataTable.Cell>
      )}
    </DataTable.Row>
  );
};

export default ProductItem;
