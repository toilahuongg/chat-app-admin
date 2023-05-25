import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TrashIcon } from '@heroicons/react/24/outline';
import { IconButton, Input } from '@material-tailwind/react';
import { ProductOptionItem } from '@src/features/Product/types';
import { DragIcon } from '@src/svgs';

type TProps = ProductOptionItem & {
  onChangeLabel: (value: string) => void;
  onChangeValue: (value: string) => void;
  onRemove: () => void;
};
const OptionItem: React.FC<TProps> = ({ id, label, value, onChangeLabel, onChangeValue, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 500,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div className="flex items-center gap-4" style={style}>
      <span className="cursor-move" ref={setNodeRef} {...attributes} {...listeners}>
        <DragIcon fill="#696969" />
      </span>
      <div className="flex-1">
        <div className="flex gap-2">
          <Input
            label="Label"
            value={label}
            variant="outlined"
            onChange={(e) => onChangeLabel(e.currentTarget.value)}
            autoComplete="option-label"
          />
          <Input
            label="Value"
            value={value}
            variant="outlined"
            onChange={(e) => onChangeValue(e.currentTarget.value)}
            autoComplete="option-value"
          />
        </div>
      </div>
      <IconButton size="sm" variant="text" color="red" className="flex items-center gap-2" onClick={onRemove}>
        <TrashIcon strokeWidth={2} className="h-5 w-5" />
      </IconButton>
    </div>
  );
};

export default OptionItem;
