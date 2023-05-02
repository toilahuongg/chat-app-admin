import { SCOPES } from '@server/utils/scopes';
import { useAccountStore } from '@src/features/Account/providers';
import { withScopes } from '@src/features/Auth/withScopes';
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

export default withScopes(AdminPage, [SCOPES.ACCESS_ADMINISTRATION]);
