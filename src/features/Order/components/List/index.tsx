import { TSuccessResponse } from '@server/schema/response.schema';
import { SCOPES } from '@server/utils/scopes';
import DataTable from '@src/components/DataTable';
import { useAccountStore } from '@src/features/Account/providers';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import useSWR from 'swr';
import { Order } from '../../types';
import OrderItem from './Item';

const ListOrders = () => {
  const { data: orders } = useSWR(
    '/orders',
    (url) => instance.get<TSuccessResponse<Order[]>>(url).then(({ data }) => data.metadata),
    {
      suspense: true,
    },
  );

  const scopes = useAccountStore((state) => state.account.scopes);
  const isAccessWrite = useMemo(() => {
    return scopes.includes(SCOPES.WRITE_ORDERS);
  }, [scopes]);

  const headings = useMemo(() => {
    const result = [
      {
        id: 'ID',
        title: 'ID',
      },
      {
        id: 'name',
        title: 'Name',
      },
      {
        id: 'description',
        title: 'Description',
      },
    ];
    if (isAccessWrite) result.push({ id: 'actions', title: '' });
    return result;
  }, [isAccessWrite]);

  return (
    <>
      <DataTable headings={headings} sticky>
        {orders!.map((item, idx) => (
          <OrderItem
            key={item._id}
            index={idx}
            order={item}
            isAccessWrite={isAccessWrite}
            onDelete={() => {
              console.log();
            }}
          />
        ))}
      </DataTable>
    </>
  );
};

export default ListOrders;
