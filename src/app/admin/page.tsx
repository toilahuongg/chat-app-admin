'use client';

import { useAccountStore } from '@src/features/Account/accountStore';

const AdminPage = () => {
  const account = useAccountStore((state) => state.account);
  return <div> Hello {account.username} </div>;
};

export default AdminPage;
