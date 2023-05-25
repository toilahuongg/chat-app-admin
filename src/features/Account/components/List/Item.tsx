import { PencilSquareIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { IconButton } from '@material-tailwind/react';
import DataTable from '@src/components/DataTable';
import { Account } from '../../types';

type AccountItem = {
  account: Account;
  isAccessWrite: boolean;
  roles: string[];
  onDelete: () => void;
};

const AccountItem: React.FC<AccountItem> = ({ account, isAccessWrite, roles, onDelete }) => {
  const { _id, username, email } = account;
  const router = useRouter();
  return (
    <DataTable.Row className="group">
      <DataTable.Cell className="w-4"> {_id}</DataTable.Cell>
      <DataTable.Cell> {username}</DataTable.Cell>
      <DataTable.Cell> {email}</DataTable.Cell>
      <DataTable.Cell> {roles.join(', ')}</DataTable.Cell>
      {isAccessWrite && (
        <DataTable.Cell className="flex justify-end gap-1 opacity-0 group-hover:opacity-100">
          <IconButton
            size="sm"
            variant="outlined"
            color="green"
            className="flex items-center gap-2"
            onClick={() => router.push('/admin/accounts/' + _id)}
          >
            <PencilSquareIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
          <IconButton size="sm" variant="outlined" className="flex items-center gap-2">
            <DocumentDuplicateIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
          <IconButton size="sm" color="red" className="flex items-center gap-2" onClick={onDelete}>
            <TrashIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </DataTable.Cell>
      )}
    </DataTable.Row>
  );
};

export default AccountItem;
