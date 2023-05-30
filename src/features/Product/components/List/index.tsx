import { TSuccessResponse } from '@server/schema/response.schema';
import { SCOPES } from '@server/utils/scopes';
import DataTable from '@src/components/DataTable';
import { useAccountStore } from '@src/features/Account/providers';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import useSWR from 'swr';
import ProductItem from './Item';
import { Product } from '../../types';

const ListProducts = () => {
  const { data: products } = useSWR(
    '/products',
    (url) => instance.get<TSuccessResponse<Product[]>>(url).then(({ data }) => data.metadata),
    {
      suspense: true,
    },
  );

  const scopes = useAccountStore((state) => state.account.scopes);
  const isAccessWrite = useMemo(() => {
    return scopes.includes(SCOPES.WRITE_PRODUCTS);
  }, [scopes]);

  const headings = useMemo(() => {
    const result = [
      {
        id: 'ID',
        title: 'ID',
      },
      {
        id: 'title',
        title: 'Title',
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
        {products!.map((item) => (
          <ProductItem
            key={item._id}
            product={item}
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

export default ListProducts;
