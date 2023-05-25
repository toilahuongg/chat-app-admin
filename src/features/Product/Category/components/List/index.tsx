import { TSuccessResponse } from '@server/schema/response.schema';
import { SCOPES } from '@server/utils/scopes';
import DataTable from '@src/components/DataTable';
import { useAccountStore } from '@src/features/Account/providers';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import useSWR from 'swr';
import { ProductCategory } from '../../types';
import ProductCategoryItem from './Item';

const ListProductCategories = () => {
  const { data: categories } = useSWR(
    '/products/categories',
    (url) => instance.get<TSuccessResponse<ProductCategory[]>>(url).then(({ data }) => data.metadata),
    {
      suspense: true,
    },
  );

  const scopes = useAccountStore((state) => state.account.scopes);
  const isAccessWrite = useMemo(() => {
    return scopes.includes(SCOPES.WRITE_PRODUCT_CATEGORIES);
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
        {categories!.map((item) => (
          <ProductCategoryItem
            key={item._id}
            category={item}
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

export default ListProductCategories;
