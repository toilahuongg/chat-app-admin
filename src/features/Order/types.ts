import { PaginationData } from '@src/types';

export interface ProductOrder {
  productId: string;
  quantity: number;
  price: number;
}
export interface Order {
  _id: string;
  detail: string;
  accountId: string;
  products: ProductOrder[];
  total: number;
}
export type PaginateOrder = PaginationData<Order>;
