import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button, IconButton, Input } from '@material-tailwind/react';
import { ProductOption } from '@src/features/Product/types';
import { DragIcon } from '@src/svgs';
import { useState } from 'react';
import ValueList from './Values/List';
import { useProductStore } from '@src/features/Product/store';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type TProps = ProductOption & {
  globalDragging: boolean;
};
const OptionItem: React.FC<TProps> = ({ id, name, globalDragging }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 500,
    opacity: isDragging ? 0.3 : 1,
    cursor: 'pointer',
  };

  const [isEdit, setIsEdit] = useState(true);

  const { addOptionValue, removeOption, setOptionName } = useProductStore((state) => state.options);
  return (
    <div className="border-t px-4 border-gray-200" style={style}>
      {isEdit && !globalDragging ? (
        <div className="py-4">
          <div className="flex items-center gap-4">
            <span className="cursor-move" ref={setNodeRef} {...attributes} {...listeners}>
              <DragIcon fill="#696969" />
            </span>
            <div className="flex-1">
              <Input
                label="Option name"
                variant="outlined"
                value={name}
                onChange={(e) => setOptionName(id, e.currentTarget.value)}
                autoComplete="option-name"
              />
            </div>
            <IconButton
              onClick={() => removeOption(id)}
              size="sm"
              variant="text"
              color="red"
              className="flex items-center gap-2"
            >
              <TrashIcon strokeWidth={2} className="h-5 w-5" />
            </IconButton>
          </div>
          <ValueList id={id} onAddOptionValue={() => addOptionValue(id)} />
          <div className="px-4">
            <Button variant="outlined" size="sm" color="blue-gray" onClick={() => setIsEdit(false)}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <div className="py-2 flex items-center gap-4">
          <span className="cursor-move" ref={setNodeRef} {...attributes} {...listeners}>
            <DragIcon fill="#696969" />
          </span>
          <div className="flex-1">{name}</div>
          <IconButton
            onClick={() => setIsEdit(true)}
            size="sm"
            variant="text"
            color="blue"
            className="flex items-center gap-2"
          >
            <PencilSquareIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default OptionItem;
