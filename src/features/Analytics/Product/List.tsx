import DataTable from '@src/components/DataTable';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import useSWR from 'swr';
import TopProductItem from './Item';
import Card from '@src/components/Card';

const ListTopProducts = () => {
  const { data: products } = useSWR('/analytics/top-products', (url) =>
    instance.get(url).then(({ data }) => data.metadata),
  );

  const headings = useMemo(() => {
    const result = [
      {
        id: 'Thumbnail',
        title: 'Thumbnail',
      },
      {
        id: 'Title',
        title: 'Title',
      },
      {
        id: 'quantity',
        title: 'Quantity',
      },
    ];
    return result;
  }, []);

  return (
    <Card>
      <Card.Section title="Top 5 products">
        <DataTable headings={headings} sticky>
          {products?.map((item) => (
            <TopProductItem key={item._id} product={item} />
          ))}
        </DataTable>
      </Card.Section>
    </Card>
  );
};

export default ListTopProducts;
