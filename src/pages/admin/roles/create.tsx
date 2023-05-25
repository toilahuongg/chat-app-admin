import { SCOPES } from '@server/utils/scopes';
import Page from '@src/components/Page';
import { withScopes } from '@src/features/Auth/withScopes';
import Button from '@src/components/Button';
import { useRoleStore } from '@src/features/Role/store';
import { toastResponse } from '@src/utils/toast';
import EditRoleForm from '@src/features/Role/Forms/Edit';
import useCreateRole from '@src/hooks/roles/useCreateRole';

const CreateRolePage = () => {
  const { role } = useRoleStore((state) => state);

  const { createRole, isMutating } = useCreateRole();

  const handleCreate = () => {
    toastResponse(createRole(role));
  };
  return (
    <Page
      title="Create role"
      backUrl="/admin/roles"
      headerActions={
        <Button isLoading={isMutating} onClick={handleCreate}>
          Create
        </Button>
      }
    >
      <EditRoleForm />
    </Page>
  );
};

export default withScopes(CreateRolePage, [SCOPES.WRITE_ROLES]);
