import { Input, Textarea } from '@material-tailwind/react';
import Card from '@src/components/Card';
import { useProductCategoryStore } from '../../store';

const EditProductCategoryForm = () => {
  const { category, setDescription, setSlug, setTitle } = useProductCategoryStore((state) => state);

  return (
    <Card>
      <Card.Section>
        <div className="flex flex-col gap-4">
          <Input
            variant="outlined"
            size="lg"
            label="Title"
            value={category.title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            autoComplete="role-name"
            required
          />
          <Textarea
            variant="outlined"
            size="lg"
            label="Description"
            value={category.description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            autoComplete="role-desc"
          />
        </div>
      </Card.Section>
    </Card>
  );
};

export default EditProductCategoryForm;
