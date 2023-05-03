import { Account } from './types';

export const initialAccount: Account = {
  _id: '',
  username: '',
  email: '',
  roles: [],
  scopes: [],
};

export const PATH_HOMEPAGE = '/';
export const PATH_SIGNIN = '/signin';
export const PATH_ADMIN = '/admin';
