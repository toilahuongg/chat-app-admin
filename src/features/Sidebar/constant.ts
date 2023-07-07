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
