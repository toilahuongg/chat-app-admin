import { TSuccessResponse } from '@server/schema/response.schema';
import Button from '@src/components/Button';
import Page from '@src/components/Page';
import EditProductForm from '@src/features/Product/components/Forms/Edit';
import { initialProduct } from '@src/features/Product/constants';
import { productStore } from '@src/features/Product/store';
import { Product } from '@src/features/Product/types';
import { useEditProduct } from '@src/hooks';
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

const EditProductPage = ({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, isLoading } = useSWR(`/products/${params?.id}`, (url) =>
    instance.get<TSuccessResponse<Product>>(url).then(({ data }) => data.metadata),
  );
  const { product, setProduct } = useStore(productStore, (state) => state);

  const { editProduct, isMutating } = useEditProduct();

  const handleEdit = () => {
    toastResponse(editProduct(params?.id as string, product));
  };

  useEffect(() => {
    if (data) setProduct(data);
    else setProduct(initialProduct);
  }, [data, setProduct]);

  if (isLoading) return <>Loading ...</>;
  return (
    <Page
      title={'Chỉnh sửa sản phẩm'}
      backUrl="/admin/products"
      headerActions={
        <Button isLoading={isMutating} onClick={handleEdit}>
          Save
        </Button>
      }
    >
      <EditProductForm />
    </Page>
  );
};

export default EditProductPage;
