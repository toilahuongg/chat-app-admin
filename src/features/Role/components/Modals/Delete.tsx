import { Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import Button from '@src/components/Button';
import { toastResponse } from '@src/utils/toast';
import { useDeleteRoleStore } from './store';
import useDeleteRole from '@src/hooks/roles/useDeleteRole';

const ModalDeleteRole = () => {
  const { isShow, role, toggleShow } = useDeleteRoleStore((state) => state);

  const { deleteRole, isMutating } = useDeleteRole();

  if (!role) return <></>;

  const handleDelete = async () => {
    toastResponse(deleteRole(role._id));
    toggleShow();
  };

  return (
    <Dialog open={isShow} handler={toggleShow}>
      <DialogHeader>Delete name: {role?.name} </DialogHeader>
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

export default ModalDeleteRole;
