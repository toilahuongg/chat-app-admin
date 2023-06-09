import ProductsOrder from './Products';
import CustomerOrder from './Customer';
import DetailOrder from './Detail';

const EditOrderForm = () => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-1 flex-col gap-4">
        <ProductsOrder />
        <DetailOrder />
      </div>
      <div className="w-96">
        <CustomerOrder />
      </div>
    </div>
  );
};

export default EditOrderForm;
