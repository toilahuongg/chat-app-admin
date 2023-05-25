import { TSuccessResponse } from '@server/schema/response.schema';
import { SCOPES } from '@server/utils/scopes';
import DataTable from '@src/components/DataTable';
import { Role } from '@src/features/Role/types';
import instance from '@src/utils/instance';
import { useMemo } from 'react';
import useSWR from 'swr';
import RoleListItem from './Item';
import { useAccountStore } from '@src/features/Account/providers';

const ListRoles = () => {
  const { data: roles } = useSWR(
    '/roles',
    (url) => instance.get<TSuccessResponse<Role[]>>(url).then(({ data }) => data.metadata),
    {
      suspense: true,
    },
  );

  const scopes = useAccountStore((state) => state.account.scopes);
  const isAccessWrite = useMemo(() => {
    return scopes.includes(SCOPES.WRITE_ROLES);
  }, [scopes]);

  const headings = useMemo(() => {
    const result = [
      {
        id: 'ID',
        title: 'ID',
      },
      {
        id: 'name',
        title: 'Name',
      },
      {
        id: 'description',
        title: 'Description',
      },
    ];
    if (isAccessWrite) result.push({ id: 'actions', title: '' });
    return result;
  }, [isAccessWrite]);

  return (
    <>
      <DataTable headings={headings} sticky>
        {roles!.map((item) => (
          <RoleListItem
            key={item._id}
            role={item}
            isAccessWrite={isAccessWrite}
            onDelete={() => {
              console.log();
            }}
          />
        ))}
      </DataTable>
    </>
  );
};

export default ListRoles;
