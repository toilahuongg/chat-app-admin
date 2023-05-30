import { TSuccessResponse } from '@server/schema/response.schema';
import { Product } from '@src/features/Product/types';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

type Arg = {
  id: string;
  body: Product;
};
const editProduct = (url: string, { arg: { id, body } }: { arg: Arg }) =>
  instance.put<TSuccessResponse<Product>>(`${url}/${id}`, body);

export const useEditProduct = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation('/products', editProduct, { revalidate: false });

  return useMemo(
    () => ({
      editProduct: async (id: string, product: Product) => {
        const response = await trigger({ id, body: product });
        mutate('/products', () => response?.data.metadata, {
          populateCache: (product: Product, products: Product[]) => {
            // filter the list, and return it with the updated item
            if (!products) return [];
            const idx = products.findIndex(({ _id }) => _id === product._id);
            products[idx] = product;
            return [...products];
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
