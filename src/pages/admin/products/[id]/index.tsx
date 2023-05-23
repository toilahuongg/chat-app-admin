import Button from '@src/components/Button';
import Page from '@src/components/Page';
import EditProductForm from '@src/features/Product/Forms/Edit';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';

export const getServerSideProps: GetServerSideProps<{ params: ParsedUrlQuery | undefined }> = async (context) => {
  return {
    props: {
      params: context.params,
    }, // will be passed to the page component as props
  };
};

const EditProductPage = ({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Page
      title="Edit product"
      backUrl="/admin/products"
      headerActions={
        <Button isLoading={false} onClick={() => {}}>
          Save
        </Button>
      }
    >
      <EditProductForm />
    </Page>
  );
};

export default EditProductPage;
