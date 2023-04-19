'use client';

import { useAccountStore } from '@src/features/Account/accountStore';
import Link from 'next/link';

const AdminPage = () => {
  const account = useAccountStore((state) => state.account);
  return (
    <div>
      {' '}
      Hello {account.username} <Link href="/admin/2"> Oke</Link>{' '}
    </div>
  );
};

export default AdminPage;
