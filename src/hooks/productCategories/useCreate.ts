import { TSuccessResponse } from '@server/schema/response.schema';
import { ProductCategory } from '@src/features/Product/Category/types';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

const createCategory = (url: string, { arg }: { arg: ProductCategory }) =>
  instance.post<TSuccessResponse<ProductCategory>>(`${url}`, arg);

export const useCreateProductCategory = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation('/products/categories', createCategory, { revalidate: false });

  return useMemo(
    () => ({
      createCategory: async (category: ProductCategory) => {
        const response = await trigger(category);
        mutate('/products/categories', () => response?.data.metadata, {
          populateCache: (category: ProductCategory, categories: ProductCategory[]) => {
            // filter the list, and return it with the updated item
            return [...(categories || []), category];
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
