import { createContext, useContext } from 'react';
import { createStore, useStore } from 'zustand';
export interface Account {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  scopes: string[];
}

type State = {
  account: Account;
};

type AccountStore = ReturnType<typeof createAccountStore>;
const createAccountStore = (account: Account) => {
  return createStore<State>(() => ({
    account: account,
  }));
};

const AccountContext = createContext<AccountStore | null>(null);
export const AccountProvider: React.FC<{ children: React.ReactNode; value: Account }> = ({ children, value }) => (
  <AccountContext.Provider value={createAccountStore(value)}>{children}</AccountContext.Provider>
);

export function useAccountStore<T>(selector: (state: State) => T) {
  const store = useContext(AccountContext)!;
  return useStore(store, selector);
}
