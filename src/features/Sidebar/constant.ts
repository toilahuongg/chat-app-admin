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
    id: 'accounts',
    title: 'Accounts',
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
    scopes: [SCOPES.ACCESS_ADMINISTRATION],
  },
];
