import { TSuccessResponse } from '@server/schema/response.schema';
import { ProductCategory } from '@src/features/Product/Category/types';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

type Arg = {
  id: string;
  body: ProductCategory;
};
const editProductCategory = (url: string, { arg: { id, body } }: { arg: Arg }) =>
  instance.put<TSuccessResponse<ProductCategory>>(`${url}/${id}`, body);

export const useEditProductCategory = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation('/products/categories', editProductCategory, { revalidate: false });

  return useMemo(
    () => ({
      editProductCategory: async (id: string, category: ProductCategory) => {
        const response = await trigger({ id, body: category });
        mutate('/products/categories', () => response?.data.metadata, {
          populateCache: (category: ProductCategory, categories: ProductCategory[]) => {
            // filter the list, and return it with the updated item
            if (!categories) return [category];
            const idx = categories.findIndex(({ _id }) => _id === category._id);
            categories[idx] = category;
            return [...categories];
          },
          revalidate: false,
        });
        return response?.data?.message;
      },
      isMutating,
    }),
    [trigger, isMutating, mutate],
  );
};
