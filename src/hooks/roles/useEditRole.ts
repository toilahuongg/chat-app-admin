import { TSuccessResponse } from '@server/schema/response.schema';
import { Role } from '@src/features/Role/types';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

type Arg = {
  id: string;
  body: Role;
};
const editRole = (url: string, { arg: { id, body } }: { arg: Arg }) =>
  instance.put<TSuccessResponse<Role>>(`${url}/${id}`, body);

export const useEditRole = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation('/roles', editRole, { revalidate: false });

  return useMemo(
    () => ({
      editRole: async (id: string, role: Role) => {
        const response = await trigger({ id, body: role });
        mutate('/roles', () => response?.data.metadata, {
          populateCache: (role: Role, roles: Role[]) => {
            // filter the list, and return it with the updated item
            if (!roles) return [role];
            const idx = roles.findIndex(({ _id }) => _id === role._id);
            roles[idx] = role;
            return [...roles];
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
