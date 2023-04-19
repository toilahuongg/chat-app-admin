import { NavItem } from './type';

export const NAV_MENU: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    link: '/admin',
  },
  {
    id: 'accounts',
    title: 'Accounts',
    children: [
      {
        id: 'create',
        title: 'Create',
        link: '/admin/accounts/create',
      },
    ],
  },
];
