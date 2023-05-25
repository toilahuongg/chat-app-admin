import { createStore, useStore } from 'zustand';
import { Account } from '../../types';
import { produce } from 'immer';

type DeleteAccountState = {
  isShow: boolean;
  account?: Account;
  toggleShow(): void;
  setAccount(account: Account): void;
};
export const deleteAccountStore = createStore<DeleteAccountState>()((set) => ({
  isShow: false,
  toggleShow: () =>
    set((state) =>
      produce(state, (draft) => {
        draft.isShow = !draft.isShow;
      }),
    ),
  setAccount: (account) => {
    set((state) =>
      produce(state, (draft) => {
        draft.account = account;
      }),
    );
  },
}));

export function useDeleteAccountStore<T>(selector: (state: DeleteAccountState) => T) {
  return useStore(deleteAccountStore, selector);
}
