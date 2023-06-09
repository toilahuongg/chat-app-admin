import { Avatar } from '@material-tailwind/react';
import DataTable from '@src/components/DataTable';

type TopProductItem = {
  product: any;
};
const TopProductItem: React.FC<TopProductItem> = ({ product }) => {
  const { media, title, totalQuantity } = product;
  return (
    <DataTable.Row className="group">
      <DataTable.Cell className="w-28">
        <Avatar src={media[0]} alt={title} withBorder={true} className="p-0.5" variant="rounded" size="xl" />
      </DataTable.Cell>
      <DataTable.Cell> {title}</DataTable.Cell>
      <DataTable.Cell> {totalQuantity}</DataTable.Cell>
    </DataTable.Row>
  );
};

export default TopProductItem;
