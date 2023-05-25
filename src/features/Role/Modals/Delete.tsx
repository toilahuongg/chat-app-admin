import { Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { useDeleteAccountStore } from './store';
import Button from '@src/components/Button';
import useDeleteAccount from '@src/hooks/accounts/useDeleteAccount';
import { toastResponse } from '@src/utils/toast';

const ModalDeleteAccount = () => {
  const { isShow, account, toggleShow } = useDeleteAccountStore((state) => state);

  const { deleteAccount, isMutating } = useDeleteAccount();

  if (!account) return <></>;

  const handleDelete = async () => {
    toastResponse(deleteAccount(account._id));
    toggleShow();
  };

  return (
    <Dialog open={isShow} handler={toggleShow}>
      <DialogHeader>Delete account: {account.username} </DialogHeader>
      <DialogBody> Are you sure delete this acccount ?</DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="green" onClick={toggleShow} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button isLoading={isMutating} variant="outlined" color="red" onClick={handleDelete}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalDeleteAccount;
