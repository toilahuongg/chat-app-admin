import { PaginationData } from '@src/types';

export interface Account {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  password?: string;
  confirmPassword?: string;
  roles: string[];
  scopes: string[];
}

export type PaginateAccount = PaginationData<Account>;
