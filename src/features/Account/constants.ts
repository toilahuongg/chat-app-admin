import { Account } from './accountStore';

export const initialAccount: Account = {
  _id: '',
  username: '',
  address: '',
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  scopes: [],
};

export const PATH_HOMEPAGE = '/';
export const PATH_SIGNIN = '/signin';
export const PATH_ADMIN = '/admin';
