import { TSuccessResponse } from '@server/schema/response.schema';
import DataTable from '@src/components/DataTable';
import { Account } from '../accountStore';
import instance from '@src/utils/instance';
import useSWR from 'swr';

const ListAccounts = () => {
  const {
    data: accounts,
    isLoading,
    error,
  } = useSWR('/accounts', (url: string) =>
    instance<TSuccessResponse<Account[]>>(url).then(({ data }) => data.metadata),
  );

  if (isLoading) return <div>Loading ...</div>;
  return (
    <DataTable
      headings={[
        {
          id: 'ID',
          title: 'ID',
        },
        {
          id: 'name',
          title: 'Name',
        },
      ]}
      sticky
    >
      {accounts.map((item) => (
        <DataTable.Row key={item._id}>
          <DataTable.Cell className="w-4"> {item._id}</DataTable.Cell>
          <DataTable.Cell> {item.username}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default ListAccounts;
