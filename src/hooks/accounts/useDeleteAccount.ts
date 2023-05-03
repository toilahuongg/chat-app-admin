import { TSuccessResponse } from '@server/schema/response.schema';
import { Account } from '@src/features/Account/types';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

type Arg = {
  id: string;
};
const deleteAccount = (url: string, { arg }: { arg: Arg }) =>
  instance.delete<TSuccessResponse<{ accountId: string }>>(`${url}/${arg.id}`);

const useDeleteAccount = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation('/accounts', deleteAccount, { revalidate: false });

  return useMemo(
    () => ({
      deleteAccount: async (id: string) => {
        const response = await trigger({ id });
        mutate('/accounts', () => response?.data.metadata.accountId, {
          populateCache: (id: string, accounts: Account[]) => {
            // filter the list, and return it with the updated item
            const filteredAccounts = accounts.filter((account) => account._id !== id);
            return [...filteredAccounts];
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

export default useDeleteAccount;
