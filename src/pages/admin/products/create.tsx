import Button from '@src/components/Button';
import Page from '@src/components/Page';
import EditProductForm from '@src/features/Product/components/Forms/Edit';
import { productStore } from '@src/features/Product/store';
import { useCreateProduct } from '@src/hooks';
import { toastResponse } from '@src/utils/toast';
import { useStore } from 'zustand';

const CreateProductPage = () => {
  const { product } = useStore(productStore, (state) => state);

  const { create, isMutating } = useCreateProduct();

  const handleCreate = () => {
    toastResponse(create(product));
  };

  return (
    <Page
      title="Tạo sản phẩm mới"
      backUrl="/admin/products"
      headerActions={
        <Button isLoading={isMutating} onClick={handleCreate}>
          Save
        </Button>
      }
    >
      <EditProductForm />
    </Page>
  );
};

export default CreateProductPage;
