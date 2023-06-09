import { TSuccessResponse } from '@server/schema/response.schema';
import Button from '@src/components/Button';
import Page from '@src/components/Page';
import EditOrderForm from '@src/features/Order/components/Forms/Edit';
import { initialOrder } from '@src/features/Order/constants';
import { orderStore } from '@src/features/Order/store';
import { Order } from '@src/features/Order/types';
import EditProductForm from '@src/features/Product/components/Forms/Edit';
import { useEditOrder } from '@src/hooks';
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

const EditOrderPage = ({ params }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, isLoading } = useSWR(`/orders/${params?.id}`, (url) =>
    instance.get<TSuccessResponse<Order>>(url).then(({ data }) => data.metadata),
  );
  const { order, setOrder } = useStore(orderStore, (state) => state);

  const { editOrder, isMutating } = useEditOrder();

  const handleEdit = () => {
    toastResponse(editOrder(params?.id as string, order));
  };

  useEffect(() => {
    if (data) setOrder(data);
    else setOrder(initialOrder);
  }, [data, setOrder]);

  if (isLoading) return <>Loading ...</>;
  return (
    <Page
      title={'Chỉnh sửa đơn hàng'}
      backUrl="/admin/orders"
      headerActions={
        <Button isLoading={isMutating} onClick={handleEdit}>
          Save
        </Button>
      }
    >
      <EditOrderForm />
    </Page>
  );
};

export default EditOrderPage;
