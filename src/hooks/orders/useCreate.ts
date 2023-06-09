import { TSuccessResponse } from '@server/schema/response.schema';
import { Order } from '@src/features/Order/types';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

const create = (url: string, { arg }: { arg: Order }) => instance.post<TSuccessResponse<Order>>(`${url}`, arg);

export const useCreateOrder = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation('/orders', create, { revalidate: false });

  return useMemo(
    () => ({
      create: async (order: Order) => {
        const response = await trigger(order);
        mutate('/orders', () => response?.data.metadata, {
          populateCache: (order: Order, orders: Order[]) => {
            // filter the list, and return it with the updated item
            return [...(orders || []), order];
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
