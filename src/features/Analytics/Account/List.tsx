import DataTable from '@src/components/DataTable';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import useSWR from 'swr';
import TopCustomerItem from './Item';
import Card from '@src/components/Card';

const ListTopAccounts = () => {
  const { data: customers } = useSWR('/analytics/top-customers', (url) =>
    instance.get(url).then(({ data }) => data.metadata),
  );

  const headings = useMemo(() => {
    const result = [
      {
        id: 'Username',
        title: 'Username',
      },
      {
        id: 'Email',
        title: 'Email',
      },
      {
        id: 'total-order',
        title: 'Total orders',
      },
    ];
    return result;
  }, []);

  return (
    <Card>
      <Card.Section title="Top 5 customers">
        <DataTable headings={headings} sticky>
          {customers?.map((item) => (
            <TopCustomerItem key={item._id} customer={item} />
          ))}
        </DataTable>
      </Card.Section>
    </Card>
  );
};

export default ListTopAccounts;
