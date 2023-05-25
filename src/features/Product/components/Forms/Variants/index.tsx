import Card from '@src/components/Card';
import OptionList from './Options/List';
import { Button } from '@material-tailwind/react';
import { PlusSmallIcon } from '@heroicons/react/24/outline';
import { useProductStore } from '../../../store';

const VariantsForm = () => {
  const addOption = useProductStore((state) => state.options.addOption);
  return (
    <Card>
      <Card.Header
        title="Variants"
        action={
          <Button variant="text" className="flex items-center gap-2" size="sm" onClick={addOption}>
            <PlusSmallIcon strokeWidth={2} className="h-5 w-5" /> Add option
          </Button>
        }
      />
      <OptionList />
    </Card>
  );
};

export default VariantsForm;
