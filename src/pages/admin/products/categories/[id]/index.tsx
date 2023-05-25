import { TSuccessResponse } from '@server/schema/response.schema';
import { SCOPES } from '@server/utils/scopes';
import Button from '@src/components/Button';
import Page from '@src/components/Page';
import { withScopes } from '@src/features/Auth/withScopes';
import EditProductCategoryForm from '@src/features/Product/Category/components/Forms/Edit';
import { productCategoryStore } from '@src/features/Product/Category/store';
import { ProductCategory } from '@src/features/Product/Category/types';
import { useEditProductCategory } from '@src/hooks';
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

const EditProductCategoryPage = ({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, isLoading } = useSWR(`/products/categories/${params?.id}`, (url) =>
    instance.get<TSuccessResponse<ProductCategory>>(url).then(({ data }) => data.metadata),
  );
  const { category, setProductCategory } = useStore(productCategoryStore, (state) => state);

  const { editProductCategory, isMutating } = useEditProductCategory();

  const handleCreate = () => {
    toastResponse(editProductCategory(params?.id as string, category));
  };

  useEffect(() => {
    if (data) setProductCategory(data);
  }, [data, setProductCategory]);

  if (isLoading) return <>Loading ...</>;

  return (
    <Page
      title="Edit role"
      backUrl="/admin/products/categories"
      headerActions={
        <Button isLoading={isMutating} onClick={handleCreate}>
          Save
        </Button>
      }
    >
      <EditProductCategoryForm />
    </Page>
  );
};

export default withScopes(EditProductCategoryPage, [SCOPES.WRITE_PRODUCT_CATEGORIES]);
