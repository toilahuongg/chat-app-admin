import { TSuccessResponse } from '@server/schema/response.schema';
import { Account } from '@src/features/Account/types';
import axios, { AxiosError } from 'axios';
import { create } from 'zustand';

type State = {
  account: string;
  password: string;
  isRememberMe: boolean;
  isLoading: boolean;
};

type MetadataLogin = {
  user: Account;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  deviceId: string;
};

type Action = {
  updateAccount(account: State['account']): void;
  updatePassword(password: State['password']): void;
  toggleIsRememberMe(): void;
  fetchLogin(): Promise<TSuccessResponse<MetadataLogin>>;
};

const useStore = create<State & Action>((set, get) => ({
  account: '',
  password: '',
  isRememberMe: false,
  isLoading: false,
  updateAccount: (account) => {
    set(() => ({ account }));
  },
  updatePassword: (password) => set(() => ({ password })),
  toggleIsRememberMe: () => set((state) => ({ isRememberMe: !state.isRememberMe })),
  fetchLogin: async () => {
    const { account, password } = get();
    try {
      set(() => ({ isLoading: true }));
      const { data } = await axios.post<TSuccessResponse<MetadataLogin>>(
        `${process.env.NEXT_PUBLIC_APP_URL}/accounts/login`,
        {
          account,
          password,
        },
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data) throw new Error(error?.response?.data.message);
      throw error;
    } finally {
      set((state) => ({ isLoading: !state.isLoading }));
      set(() => ({ isLoading: false }));
    }
  },
}));

export default useStore;
