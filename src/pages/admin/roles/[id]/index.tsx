import { TSuccessResponse } from '@server/schema/response.schema';
import Button from '@src/components/Button';
import Page from '@src/components/Page';
import EditRoleForm from '@src/features/Role/Forms/Edit';
import { roleStore } from '@src/features/Role/store';
import { Role } from '@src/features/Role/types';
import { useEditRole } from '@src/hooks/roles/useEditRole';
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

const EditRolePage = ({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, isLoading } = useSWR(`/roles/${params?.id}`, (url) =>
    instance.get<TSuccessResponse<Role>>(url).then(({ data }) => data.metadata),
  );
  const { role, setRole } = useStore(roleStore, (state) => state);

  const { editRole, isMutating } = useEditRole();

  const handleCreate = () => {
    toastResponse(editRole(params?.id as string, role));
  };

  useEffect(() => {
    if (data) setRole(data);
  }, [data, setRole]);

  if (isLoading) return <>Loading ...</>;

  return (
    <Page
      title="Edit role"
      backUrl="/admin/roles"
      headerActions={
        <Button isLoading={isMutating} onClick={handleCreate}>
          Save
        </Button>
      }
    >
      <EditRoleForm />
    </Page>
  );
};

export default EditRolePage;
