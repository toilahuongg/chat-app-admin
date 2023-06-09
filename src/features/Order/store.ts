import { produce } from 'immer';
import { createStore, useStore } from 'zustand';
import { Order, ProductOrder } from './types';
import { initialOrder } from './constants';

export type StateOrder = {
  order: Order;
  setOrder: (value: Order) => void;
  setDetail: (value: string) => void;
  setTotal: (value: number) => void;
  handleAddProducts: (products: ProductOrder[]) => void;
  handleChangeQuantity: (productId: string, quantity: number) => void;
  handleChooseAccount: (accountId: string) => void;
};

export type OrderStore = ReturnType<typeof createOrderStore>;
export const createOrderStore = (order: Order) => {
  return createStore<StateOrder>((set) => ({
    order,
    setOrder: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.order = value;
        }),
      ),
    setDetail: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.order.detail = value;
        }),
      ),
    setTotal: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.order.total = value;
        }),
      ),
    handleAddProducts: (products) =>
      set((state) =>
        produce(state, (draft) => {
          draft.order.products.push(...products);
        }),
      ),
    handleChangeQuantity: (productId, quantity) =>
      set((state) =>
        produce(state, (draft) => {
          const idx = draft.order.products.findIndex((p) => p.productId === productId);
          if (idx >= 0) draft.order.products[idx].quantity = quantity;
        }),
      ),
    handleChooseAccount: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.order.accountId = value;
        }),
      ),
  }));
};

export const orderStore = createOrderStore(initialOrder);
export function useOrderStore<T>(selector: (state: StateOrder) => T) {
  return useStore(orderStore, selector);
}
