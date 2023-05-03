import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { IconButton, Input } from '@material-tailwind/react';
import { TSuccessResponse } from '@server/schema/response.schema';
import { SCOPES } from '@server/utils/scopes';
import DataTable from '@src/components/DataTable';
import Pagination from '@src/components/Pagination';
import { Role } from '@src/features/Role/store';
import useDebounce from '@src/hooks/useDebounce';
import useQueryParams from '@src/hooks/useQueryParams';
import instance from '@src/utils/instance';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import ModalDeleteAccount from '../Modals/Delete';
import { useDeleteAccountStore } from '../Modals/modalStore';
import { useAccountStore } from '../providers';
import { PaginateAccount } from '../types';
import AccountListItem from './Item';

const ListAccounts = () => {
  const router = useRouter();
  const { params } = useQueryParams(['keyword', 'page', 'limit', 'sortBy']);

  const mount = useRef(false);

  const [text, setText] = useState<string>(params.get('keyword') || '');
  const textSearch = useDebounce(text, 500);

  useEffect(() => {
    if (mount.current) router.query.page = '1';
    router.query.keyword = textSearch;
    router.push({ pathname: router.pathname, query: router.query });
    mount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textSearch]);

  const { data } = useSWR(
    '/accounts' + (params ? `?${params}` : ''),
    (url: string) => instance<TSuccessResponse<PaginateAccount>>(url).then(({ data }) => data.metadata),
    { suspense: true },
  );
  const { items: accounts, ...propsPagination } = data;

  const { data: roles } = useSWR(
    '/roles',
    (url) => instance.get<TSuccessResponse<Role[]>>(url).then(({ data }) => data.metadata),
    {
      suspense: true,
    },
  );
  const getNameRoles = useCallback(
    (ids: string[]) =>
      roles ? ids.map((id) => roles.find(({ _id }) => id === _id)?.name || '').filter((item) => !!item) : [],
    [roles],
  );

  const scopes = useAccountStore((state) => state.account.scopes);
  const isAccessWrite = useMemo(() => {
    return scopes.includes(SCOPES.WRITE_ACCOUNTS);
  }, [scopes]);

  const { toggleShow, setAccount } = useDeleteAccountStore((state) => state);

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
      <div className="relative flex w-full">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          className="pr-20 !border-t-blue-gray-200 focus:!border-t-blue-500"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          containerProps={{
            className: 'min-w-0',
          }}
        />
        <IconButton size="sm" className="!absolute right-1 top-1 rounded">
          <MagnifyingGlassIcon color="white" className="w-4 h-4" />
        </IconButton>
      </div>
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
      <Pagination
        {...propsPagination}
        onChangePage={(p) => router.push({ pathname: router.pathname, query: { ...router.query, page: p } })}
      />
      <ModalDeleteAccount />
    </>
  );
};

export default ListAccounts;
