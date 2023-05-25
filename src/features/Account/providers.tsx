import { TSuccessResponse } from '@server/schema/response.schema';
import { SCOPES } from '@server/utils/scopes';
import { AccountStore, StateAccount, createAccountStore } from '@src/features/Account/store';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';
import { PATH_ADMIN, PATH_HOMEPAGE, PATH_SIGNIN } from './constants';
import useSWR from 'swr';
import instance from '@src/utils/instance';
import { Account } from './types';

const AccountContext = createContext<AccountStore | null>(null);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading, error } = useSWR('/accounts/me', (url) =>
    instance<TSuccessResponse<Account>>(url).then(({ data }) => data.metadata),
  );
  if (isLoading) return <div> Loading ...</div>;
  if (error && (pathname?.startsWith(PATH_ADMIN) || pathname === PATH_HOMEPAGE)) router.push(PATH_SIGNIN);
  if (data && !data.scopes.includes(SCOPES.ACCESS_ADMINISTRATION) && pathname !== PATH_SIGNIN)
    return <div> Access denied</div>;
  if (data && !pathname?.startsWith(PATH_ADMIN)) router.push(PATH_ADMIN);
  return <AccountContext.Provider value={createAccountStore(data!)}>{children}</AccountContext.Provider>;
}

export function useAccountStore<T>(selector: (state: StateAccount) => T) {
  const store = useContext(AccountContext)!;
  return useStore(store, selector);
}
