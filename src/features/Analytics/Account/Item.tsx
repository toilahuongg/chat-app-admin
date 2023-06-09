import DataTable from '@src/components/DataTable';

type TopCustomerItem = {
  customer: any;
};
const TopCustomerItem: React.FC<TopCustomerItem> = ({ customer }) => {
  const { username, email, totalOrders } = customer;
  return (
    <DataTable.Row className="group">
      <DataTable.Cell className="w-80"> {username} </DataTable.Cell>
      <DataTable.Cell> {email}</DataTable.Cell>
      <DataTable.Cell> {totalOrders}</DataTable.Cell>
    </DataTable.Row>
  );
};

export default TopCustomerItem;
