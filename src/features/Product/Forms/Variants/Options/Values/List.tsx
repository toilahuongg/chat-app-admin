import { useProductStore } from '@src/features/Product/store';
import ValueItem from './Item';
import { IconButton } from '@material-tailwind/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import Sortable from '@src/components/Sortable';

type ValueList = {
  id: string;
  onAddOptionValue: () => void;
};
const ValueList: React.FC<ValueList> = ({ id, onAddOptionValue }) => {
  const { values, setLabel, setValue, removeValue, handleDragEnd } = useProductStore((state) => ({
    values: state.product.options.find((option) => option.id === id)?.values,
    ...state.options.values,
  }));
  return (
    <div className="p-4">
      <div className="flex items-center pb-2 pl-1">
        <div className="text-blue-gray-700 flex-1">Option values</div>
        <IconButton
          onClick={onAddOptionValue}
          size="sm"
          variant="text"
          color="blue"
          className="flex items-center gap-2"
        >
          <PlusIcon strokeWidth={2} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="flex flex-col gap-2">
        <Sortable ids={values?.map(({ id }) => id) || []} onDragEnd={(e) => handleDragEnd(id, e)}>
          {values?.map((value) => (
            <ValueItem
              key={value.id}
              {...value}
              onChangeLabel={(val) => setLabel(id, value.id, val)}
              onChangeValue={(val) => setValue(id, value.id, val)}
              onRemove={() => removeValue(id, value.id)}
            />
          ))}
        </Sortable>
      </div>
    </div>
  );
};

export default ValueList;
