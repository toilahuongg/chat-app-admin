import { useProductStore } from '@src/features/Product/store';
import OptionItem from './Item';
import Sortable from '@src/components/Sortable';
import { useState } from 'react';

const OptionList = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { options, handleDragEnd } = useProductStore((state) => ({
    options: state.product.options,
    handleDragEnd: state.options.handleDragEnd,
  }));
  return (
    <div>
      <Sortable
        ids={options.map(({ id }) => id)}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(e) => {
          handleDragEnd(e);
          setIsDragging(false);
        }}
      >
        {options.map((option) => (
          <OptionItem key={option.id} {...option} globalDragging={isDragging} />
        ))}
      </Sortable>
    </div>
  );
};

export default OptionList;
