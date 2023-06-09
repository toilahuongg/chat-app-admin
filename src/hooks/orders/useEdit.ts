import { TSuccessResponse } from '@server/schema/response.schema';
import { Order } from '@src/features/Order/types';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

type Arg = {
  id: string;
  body: Order;
};
const editOrder = (url: string, { arg: { id, body } }: { arg: Arg }) =>
  instance.put<TSuccessResponse<Order>>(`${url}/${id}`, body);

export const useEditOrder = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation('/orders', editOrder, { revalidate: false });

  return useMemo(
    () => ({
      editOrder: async (id: string, order: Order) => {
        const response = await trigger({ id, body: order });
        mutate('/orders', () => response?.data.metadata, {
          populateCache: (order: Order, orders: Order[]) => {
            // filter the list, and return it with the updated item
            if (!orders) return [];
            const idx = orders.findIndex(({ _id }) => _id === order._id);
            orders[idx] = order;
            return [...orders];
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
