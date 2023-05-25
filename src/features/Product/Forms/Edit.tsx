import VariantsForm from './Variants';
import ProductTitleDescription from './TitleDescription';
import ProductMedia from './Media';
import ProductPrice from './Price';
import ProductStatus from './Status';
import ProductOrganization from './Organization';

const EditProductForm = () => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 flex flex-col gap-4">
        <ProductTitleDescription />
        <ProductMedia />
        <ProductPrice />
        <VariantsForm />
      </div>
      <div className="w-80 flex flex-col gap-4">
        <ProductStatus />
        <ProductOrganization />
      </div>
    </div>
  );
};

export default EditProductForm;
