import { createStore } from 'zustand';
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

export type StateAccount = {
  account: Account;
};

export type AccountStore = ReturnType<typeof createAccountStore>;
export const createAccountStore = (account: Account) => {
  return createStore<StateAccount>(() => ({
    account: account,
  }));
};
