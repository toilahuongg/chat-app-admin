import { SCOPES } from '@server/utils/scopes';
import { Role } from './types';

export const initialRole: Role = {
  _id: '',
  name: '',
  scopes: [],
  desc: '',
};

export const LIST_SCOPES = [
  {
    name: 'Admin',
    scopes: [SCOPES.ACCESS_ADMINISTRATION],
  },
  {
    name: 'Product',
    scopes: [SCOPES.READ_PRODUCTS, SCOPES.WRITE_PRODUCTS],
  },
  {
    name: 'Role',
    scopes: [SCOPES.READ_ROLES, SCOPES.WRITE_ROLES],
  },
  {
    name: 'Account',
    scopes: [SCOPES.READ_ACCOUNTS, SCOPES.WRITE_ACCOUNTS],
  },
];
