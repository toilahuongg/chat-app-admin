import { SCOPES } from '@server/utils/scopes';
import { NavItem } from './type';

export const NAV_MENU: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    link: '/admin',
    scopes: [SCOPES.ACCESS_ADMINISTRATION],
  },
  {
    id: 'products',
    title: 'Products',
    children: [
      {
        id: 'product-list',
        title: 'Product list',
        link: '/admin/products',
        scopes: [SCOPES.READ_PRODUCTS, SCOPES.WRITE_PRODUCTS],
      },
      {
        id: 'create',
        title: 'Create',
        link: '/admin/products/create',
        scopes: [SCOPES.WRITE_PRODUCTS],
      },
    ],
    scopes: [SCOPES.READ_PRODUCTS],
  },
  {
    id: 'roles',
    title: 'Roles',
    link: '/admin/roles',
    disableLink: true,
    children: [
      {
        id: 'role-list',
        title: 'Role list',
        link: '/admin/roles',
        scopes: [SCOPES.READ_ROLES, SCOPES.WRITE_ROLES],
      },
      {
        id: 'create',
        title: 'Create',
        link: '/admin/roles/create',
        scopes: [SCOPES.WRITE_ROLES],
      },
    ],
    scopes: [SCOPES.READ_ROLES],
  },
  {
    id: 'accounts',
    title: 'Accounts',
    link: '/admin/accounts',
    disableLink: true,
    children: [
      {
        id: 'account-list',
        title: 'Account list',
        link: '/admin/accounts',
        scopes: [SCOPES.READ_ACCOUNTS, SCOPES.WRITE_ACCOUNTS],
      },
      {
        id: 'create',
        title: 'Create',
        link: '/admin/accounts/create',
        scopes: [SCOPES.WRITE_ACCOUNTS],
      },
    ],
    scopes: [SCOPES.READ_ACCOUNTS],
  },
];
