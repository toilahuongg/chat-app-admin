import { Card, CardBody } from '@material-tailwind/react';
import { TSuccessResponse } from '@server/schema/response.schema';
import Button from '@src/components/Button';
import Page from '@src/components/Page';
import EditAccountForm from '@src/features/Account/Forms/Edit';
import { accountStore } from '@src/features/Account/store';
import { Account } from '@src/features/Account/types';
import useEditAccount from '@src/hooks/accounts/useEditAccount';
import instance from '@src/utils/instance';
import { toastResponse } from '@src/utils/toast';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useStore } from 'zustand';

export const getServerSideProps: GetServerSideProps<{ params: ParsedUrlQuery | undefined }> = async (context) => {
  return {
    props: {
      params: context.params,
    }, // will be passed to the page component as props
  };
};

const EditAccountPage = ({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, isLoading } = useSWR(`/accounts/${params?.id}`, (url) =>
    instance.get<TSuccessResponse<Account>>(url).then(({ data }) => data.metadata),
  );
  const { account, setAccount } = useStore(accountStore, (state) => state);

  const { editAccount, isMutating } = useEditAccount();

  const handleCreate = () => {
    toastResponse(editAccount(params?.id as string, account));
  };

  useEffect(() => {
    if (data) setAccount(data);
  }, [data, setAccount]);

  if (isLoading) return <>Loading ...</>;

  return (
    <Page
      title="Edit account"
      backUrl="/admin/accounts"
      headerActions={
        <Button isLoading={isMutating} onClick={handleCreate}>
          Save
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

export default EditAccountPage;
