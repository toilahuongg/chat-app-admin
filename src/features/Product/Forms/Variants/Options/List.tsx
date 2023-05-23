import { useProductStore } from '@src/features/Product/store';
import OptionItem from './Item';
import Sortable from '@src/components/Sortable';

const OptionList = () => {
  const { options, handleDragEnd } = useProductStore((state) => ({
    options: state.product.options,
    handleDragEnd: state.options.handleDragEnd,
  }));
  return (
    <div>
      <Sortable ids={options.map(({ id }) => id)} onDragEnd={handleDragEnd}>
        {options.map((option) => (
          <OptionItem key={option.id} {...option} />
        ))}
      </Sortable>
    </div>
  );
};

export default OptionList;
