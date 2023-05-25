import { TSuccessResponse } from '@server/schema/response.schema';
import { Account } from '@src/features/Account/types';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

type Arg = {
  id: string;
  body: Account;
};
const editAccount = (url: string, { arg: { id, body } }: { arg: Arg }) =>
  instance.put<TSuccessResponse<Account>>(`${url}/${id}`, body);

export const useEditAccount = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation('/accounts', editAccount, { revalidate: false });

  return useMemo(
    () => ({
      editAccount: async (id: string, account: Account) => {
        const response = await trigger({ id, body: account });
        mutate('/accounts', () => response?.data.metadata, {
          populateCache: (account: Account, accounts: Account[]) => {
            // filter the list, and return it with the updated item
            if (!accounts) return [account];
            const idx = accounts.findIndex(({ _id }) => _id === account._id);
            accounts[idx] = account;
            return [...accounts];
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
