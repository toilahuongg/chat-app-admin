import { TSuccessResponse } from '@server/schema/response.schema';
import { Role } from '@src/features/Role/types';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

const createRole = (url: string, { arg }: { arg: Role }) => instance.post<TSuccessResponse<Role>>(`${url}`, arg);

const useCreateRole = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation('/roles', createRole, { revalidate: false });

  return useMemo(
    () => ({
      createRole: async (role: Role) => {
        const response = await trigger(role);
        mutate('/roles', () => response?.data.metadata, {
          populateCache: (role: Role, roles: Role[]) => {
            // filter the list, and return it with the updated item
            return [...(roles || []), role];
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

export default useCreateRole;
