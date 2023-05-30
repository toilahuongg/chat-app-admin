import { TSuccessResponse } from '@server/schema/response.schema';
import { Role } from '@src/features/Role/types';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

type Arg = {
  id: string;
};
const deleteRole = (url: string, { arg }: { arg: Arg }) =>
  instance.delete<TSuccessResponse<{ roleId: string }>>(`${url}/${arg.id}`);

export const useDeleteRole = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation('/roles', deleteRole, { revalidate: false });

  return useMemo(
    () => ({
      deleteRole: async (id: string) => {
        const response = await trigger({ id });
        mutate('/roles', () => response?.data.metadata.roleId, {
          populateCache: (id: string, roles: Role[]) => {
            // filter the list, and return it with the updated item
            const filteredRoles = roles.filter((role) => role._id !== id);
            return [...filteredRoles];
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
