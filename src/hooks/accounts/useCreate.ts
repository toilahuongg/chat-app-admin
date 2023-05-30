import { TSuccessResponse } from '@server/schema/response.schema';
import { Account } from '@src/features/Account/types';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

const createAccount = (url: string, { arg }: { arg: Account }) =>
  instance.post<TSuccessResponse<{ accountId: string }>>(`${url}`, arg);

export const useCreateAccount = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation('/accounts/create', createAccount, { revalidate: false });

  return useMemo(
    () => ({
      createAccount: async (account: Account) => {
        const response = await trigger(account);
        mutate('/accounts', () => response?.data.metadata, {
          populateCache: (account: Account, accounts: Account[]) => {
            // filter the list, and return it with the updated item
            return [...(accounts || []), account];
          },
          revalidate: false,
        });
        return response?.data?.message;
      },
      isMutating,
    }),
    [trigger, isMutating, mutate],
  );
};
