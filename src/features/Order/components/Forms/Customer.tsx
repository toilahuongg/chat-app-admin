import { Button } from '@material-tailwind/react';
import Card from '@src/components/Card';
import ModalAccountPicker from '@src/features/Account/components/Modals/AccountPicker';
import { useCallback, useState } from 'react';
import { useOrderStore } from '../../store';
import { TSuccessResponse } from '@server/schema/response.schema';
import { Account } from '@src/features/Account/types';
import instance from '@src/utils/instance';
import useSWR from 'swr';

const CustomerOrder = () => {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen((isOpen) => !isOpen), []);

  const { order, handleChooseAccount } = useOrderStore((state) => state);

  const { data } = useSWR(`/accounts/${order.accountId || 'null'}`, (url) =>
    instance.get<TSuccessResponse<Account>>(url).then(({ data }) => data.metadata),
  );

  return (
    <Card>
      <Card.Section
        title="Khách hàng"
        actions={
          <Button size="sm" onClick={toggleOpen}>
            Sửa
          </Button>
        }
      >
        {data && (
          <ul>
            <li>Username: {data.username}</li>
            <li>Email: {data.email}</li>
          </ul>
        )}
      </Card.Section>
      <ModalAccountPicker
        open={open}
        toggleOpen={toggleOpen}
        selected={order.accountId}
        onSelect={handleChooseAccount}
      />
    </Card>
  );
};

export default CustomerOrder;
