'use client';

import { ThemeProvider } from '@material-tailwind/react';
import { TSuccessResponse } from '@server/schema/response.schema';
import { SCOPES } from '@server/utils/scopes';
import { Account, AccountProvider } from '@src/features/Account/accountStore';
import instance from '@src/utils/instance';
import { redirect, usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import useSWR from 'swr';

const PATH_HOMEPAGE = '/';
const PATH_SIGNIN = '/signin';
const PATH_ADMIN = '/admin';

type Props = {
  children: React.ReactNode;
};
export default function RootTemplate({ children }: Props) {
  const pathname = usePathname();
  const { data, isLoading, error } = useSWR('/accounts/me', (url) =>
    instance<TSuccessResponse<Account>>(url).then(({ data }) => data.metadata),
  );
  if (isLoading) return <div> Loading ...</div>;
  if (error && (pathname.startsWith(PATH_ADMIN) || pathname === PATH_HOMEPAGE)) redirect(PATH_SIGNIN);
  if (data && !data.scopes.includes(SCOPES.ACCESS_ADMINISTRATION) && pathname !== PATH_SIGNIN) redirect(PATH_SIGNIN);
  if (data && !pathname.startsWith(PATH_ADMIN)) redirect(PATH_ADMIN);

  return (
    <div>
      <ThemeProvider>
        <AccountProvider value={data!}>{children}</AccountProvider>
        <Toaster />
      </ThemeProvider>
    </div>
  );
}
