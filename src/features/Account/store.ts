import { produce } from 'immer';
import { createStore } from 'zustand';
import { initialAccount } from './constants';
import { Account } from './types';

export type StateAccount = {
  account: Account;
  setAccount: (value: Account) => void;
  setUsername: (value: Account['username']) => void;
  setFullname: (value: Account['fullname']) => void;
  setEmail: (value: Account['email']) => void;
  setPhoneNumber: (value: Account['phoneNumber']) => void;
  setPassword: (value: Account['password']) => void;
  setConfirmPassword: (value: Account['confirmPassword']) => void;
  setAddress: (value: Account['address']) => void;
  toggleRoles: (id: string) => void;
};

export type AccountStore = ReturnType<typeof createAccountStore>;
export const createAccountStore = (account: Account) => {
  return createStore<StateAccount>((set) => ({
    account: account,
    setAccount: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.account = value;
        }),
      ),
    setUsername: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.account.username = value;
        }),
      ),
    setFullname: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.account.fullname = value;
        }),
      ),
    setAddress: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.account.address = value;
        }),
      ),
    setPassword: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.account.password = value;
        }),
      ),
    setConfirmPassword: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.account.confirmPassword = value;
        }),
      ),
    setEmail: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.account.email = value;
        }),
      ),
    setPhoneNumber: (value) =>
      set((state) =>
        produce(state, (draft) => {
          draft.account.phoneNumber = value;
        }),
      ),
    toggleRoles: (id) =>
      set((state) =>
        produce(state, (draft) => {
          const idx = draft.account.roles.findIndex((el) => el === id);
          if (idx >= 0) draft.account.roles.splice(idx, 1);
          else draft.account.roles.push(id);
        }),
      ),
  }));
};

export const accountStore = createAccountStore(initialAccount);
