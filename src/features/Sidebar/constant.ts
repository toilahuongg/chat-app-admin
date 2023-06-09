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
    title: 'Sản phẩm',
    link: '/admin/products',
    children: [
      {
        id: 'category-list',
        title: 'Danh mục sản phẩm',
        link: '/admin/product-categories',
        scopes: [SCOPES.WRITE_PRODUCTS],
      },
    ],
    scopes: [SCOPES.READ_PRODUCTS, SCOPES.WRITE_PRODUCTS],
  },
  {
    id: 'orders',
    title: 'Đơn hàng',
    link: '/admin/orders',
    scopes: [SCOPES.READ_PRODUCTS, SCOPES.WRITE_PRODUCTS],
  },
  {
    id: 'roles',
    title: 'Phân quyền',
    link: '/admin/roles',
    scopes: [SCOPES.READ_ROLES, SCOPES.WRITE_ROLES],
  },
  {
    id: 'accounts',
    title: 'Tài khoản',
    link: '/admin/accounts',
    scopes: [SCOPES.READ_ACCOUNTS, SCOPES.WRITE_ACCOUNTS],
  },
];
