import { SCOPES } from '@server/utils/scopes';
import Page from '@src/components/Page';
import { withScopes } from '@src/features/Auth/withScopes';
import Button from '@src/components/Button';
import { toastResponse } from '@src/utils/toast';
import { useCreateProductCategory } from '@src/hooks';
import EditProductCategoryForm from '@src/features/Product/Category/components/Forms/Edit';
import { useProductCategoryStore } from '@src/features/Product/Category/store';

const CreateProductCategoryPage = () => {
  const { category } = useProductCategoryStore((state) => state);

  const { createCategory, isMutating } = useCreateProductCategory();

  const handleCreate = () => {
    toastResponse(createCategory(category));
  };
  return (
    <Page
      title="Tạo danh mục sản phẩm mới"
      backUrl="/admin/products/categories"
      headerActions={
        <Button isLoading={isMutating} onClick={handleCreate}>
          Create
        </Button>
      }
    >
      <EditProductCategoryForm />
    </Page>
  );
};

export default withScopes(CreateProductCategoryPage, [SCOPES.WRITE_PRODUCT_CATEGORIES]);
