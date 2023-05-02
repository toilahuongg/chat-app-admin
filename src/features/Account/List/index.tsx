import { TSuccessResponse } from '@server/schema/response.schema';
import { SCOPES } from '@server/utils/scopes';
import DataTable from '@src/components/DataTable';
import { Role } from '@src/features/Role/store';
import instance from '@src/utils/instance';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import ModalDeleteAccount from '../Modals/Delete';
import { useDeleteAccountStore } from '../Modals/modalStore';
import { useAccountStore } from '../providers';
import { Account } from '../store';
import AccountListItem from './Item';

const ListAccounts = () => {
  const scopes = useAccountStore((state) => state.account.scopes);

  const isAccessWrite = useMemo(() => {
    return scopes.includes(SCOPES.WRITE_ACCOUNTS);
  }, [scopes]);

  const { data: accounts } = useSWR(
    '/accounts',
    (url: string) => instance<TSuccessResponse<Account[]>>(url).then(({ data }) => data.metadata),
    { suspense: true },
  );

  const { data: roles } = useSWR(
    '/roles',
    (url) => instance.get<TSuccessResponse<Role[]>>(url).then(({ data }) => data.metadata),
    {
      suspense: true,
    },
  );

  const { toggleShow, setAccount } = useDeleteAccountStore((state) => state);

  const getNameRoles = useCallback(
    (ids: string[]) =>
      roles ? ids.map((id) => roles.find(({ _id }) => id === _id)?.name || '').filter((item) => !!item) : [],
    [roles],
  );
  const headings = useMemo(() => {
    const result = [
      {
        id: 'ID',
        title: 'ID',
      },
      {
        id: 'username',
        title: 'Username',
      },
      {
        id: 'email',
        title: 'Email',
      },
      {
        id: 'roles',
        title: 'Roles',
      },
    ];
    if (isAccessWrite) result.push({ id: 'actions', title: '' });
    return result;
  }, [isAccessWrite]);
  return (
    <>
      <DataTable headings={headings} sticky>
        {accounts!.map((item) => (
          <AccountListItem
            key={item._id}
            account={item}
            isAccessWrite={isAccessWrite}
            roles={getNameRoles(item.roles || [])}
            onDelete={() => {
              toggleShow();
              setAccount(item);
            }}
          />
        ))}
      </DataTable>
      <ModalDeleteAccount />
    </>
  );
};

export default ListAccounts;
