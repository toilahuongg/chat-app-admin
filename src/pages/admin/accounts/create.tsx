import { Card, CardBody } from '@material-tailwind/react';
import { SCOPES } from '@server/utils/scopes';
import Page from '@src/components/Page';
import EditAccountForm from '@src/features/Account/Forms/Edit';
import { withScopes } from '@src/features/Auth/withScopes';
import Button from '@src/components/Button';
import { useStore } from 'zustand';
import { accountStore } from '@src/features/Account/store';
import useCreateAccount from '@src/hooks/accounts/useCreateAccount';
import { toastResponse } from '@src/utils/toast';

const CreateAccountPage = () => {
  const account = useStore(accountStore, (state) => state.account);

  const { createAccount, isMutating } = useCreateAccount();

  const handleCreate = () => {
    toastResponse(createAccount(account));
  };
  return (
    <Page
      title="Create account"
      backUrl="/admin/accounts"
      headerActions={
        <Button isLoading={isMutating} onClick={handleCreate}>
          Create
        </Button>
      }
    >
      <Card className="mt-4">
        <CardBody>
          <EditAccountForm />
        </CardBody>
      </Card>
    </Page>
  );
};

export default withScopes(CreateAccountPage, [SCOPES.WRITE_ACCOUNTS]);
