import { Account } from '@src/features/Account/types';
import { create } from 'zustand';

type State = {
  isLoggedIn: boolean;
  account?: Account;
};

type Action = {
  updateLoggedIn: (account: State['account']) => void;
};

const useStore = create<State & Action>((set) => ({
  isLoggedIn: false,
  updateLoggedIn: (account) => set(() => ({ isLoggedIn: true, account })),
}));

export default useStore;
