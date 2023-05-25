import { SCOPES } from '@server/utils/scopes';
import Page from '@src/components/Page';
import EditAccountForm from '@src/features/Account/Forms/Edit';
import { withScopes } from '@src/features/Auth/withScopes';
import Button from '@src/components/Button';
import { useStore } from 'zustand';
import { accountStore } from '@src/features/Account/store';
import { useCreateAccount } from '@src/hooks';
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
      <EditAccountForm />
    </Page>
  );
};

export default withScopes(CreateAccountPage, [SCOPES.WRITE_ACCOUNTS]);
