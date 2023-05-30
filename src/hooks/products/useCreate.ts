import { TSuccessResponse } from '@server/schema/response.schema';
import { Product } from '@src/features/Product/types';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

const create = (url: string, { arg }: { arg: Product }) => instance.post<TSuccessResponse<Product>>(`${url}`, arg);

export const useCreateProduct = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation('/products', create, { revalidate: false });

  return useMemo(
    () => ({
      create: async (product: Product) => {
        const response = await trigger(product);
        mutate('/products', () => response?.data.metadata, {
          populateCache: (product: Product, categories: Product[]) => {
            // filter the list, and return it with the updated item
            return [...(categories || []), product];
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
