import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react';
import { TSuccessResponse } from '@server/schema/response.schema';
import instance from '@src/utils/instance';
import useSWR from 'swr';
import { Account } from '../../types';

type TProps = {
  open: boolean;
  selected: string;
  onSelect: (selected: string) => void;
  toggleOpen: () => void;
};
const ModalAccountPicker: React.FC<TProps> = ({ open, selected, onSelect, toggleOpen }) => {
  const { data: accounts } = useSWR('/accounts', (url) =>
    instance.get<TSuccessResponse<{ items: Account[] }>>(url).then(({ data }) => data.metadata.items),
  );

  const handleChooseAccount = (account: Account) => {
    onSelect(account._id);
    toggleOpen();
  };

  return (
    <Dialog open={open} handler={toggleOpen}>
      <DialogHeader>Accounts picker</DialogHeader>
      <DialogBody divider>
        <List>
          {accounts?.map((account) => {
            const { _id, username, email } = account;
            return (
              <ListItem key={_id} onClick={() => handleChooseAccount(account)} selected={selected === _id}>
                <ListItemPrefix>
                  <Typography variant="h6" color="blue-gray">
                    {username}
                  </Typography>
                </ListItemPrefix>
                <div>
                  <Typography variant="small" color="gray" className="font-normal">
                    {email}
                  </Typography>
                </div>
              </ListItem>
            );
          })}
        </List>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={toggleOpen} className="mr-1">
          <span>Cancel</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalAccountPicker;
