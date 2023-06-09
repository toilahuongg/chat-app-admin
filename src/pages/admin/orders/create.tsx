import Button from '@src/components/Button';
import Page from '@src/components/Page';
import EditOrderForm from '@src/features/Order/components/Forms/Edit';
import { initialOrder } from '@src/features/Order/constants';
import { orderStore } from '@src/features/Order/store';
import { useCreateOrder } from '@src/hooks';
import { toastResponse } from '@src/utils/toast';
import { useEffect } from 'react';
import { useStore } from 'zustand';

const CreateOrderPage = () => {
  const { order, setOrder } = useStore(orderStore, (state) => state);

  const { create, isMutating } = useCreateOrder();

  const handleCreate = () => {
    toastResponse(create(order));
  };

  useEffect(() => {
    setOrder(initialOrder);
  }, [setOrder]);

  return (
    <Page
      title="Tạo đơn đặt hàng mới"
      backUrl="/admin/products"
      headerActions={
        <Button isLoading={isMutating} onClick={handleCreate}>
          Tạo mới
        </Button>
      }
    >
      <EditOrderForm />
    </Page>
  );
};

export default CreateOrderPage;
