import { Checkbox, Input, Textarea } from '@material-tailwind/react';

import Card from '@src/components/Card';
import { useRoleStore } from '../store';
import { LIST_SCOPES } from '../constants';

const EditRoleForm = () => {
  const { role, setDesc, setName, toggleScrope } = useRoleStore((state) => state);

  return (
    <div className="flex gap-4">
      <div className="flex flex-1 flex-col gap-4">
        {LIST_SCOPES.map(({ name, scopes }) => (
          <Card key={name}>
            <Card.Section title={name}>
              <div className="grid grid-cols-4 gap-4">
                {scopes.map((scope) => (
                  <div key={scope}>
                    <Checkbox
                      id={scope}
                      label={scope}
                      checked={role.scopes.includes(scope)}
                      onChange={() => toggleScrope(scope)}
                    />
                  </div>
                ))}
              </div>
            </Card.Section>
          </Card>
        ))}
      </div>
      <div className="w-96">
        <Card>
          <Card.Section>
            <div className="flex flex-col gap-4">
              <Input
                variant="outlined"
                size="lg"
                label="Name"
                type="Name"
                value={role.name}
                onChange={(e) => setName(e.currentTarget.value)}
                autoComplete="role-name"
                required
              />
              <Textarea
                variant="outlined"
                size="lg"
                label="Description"
                value={role.desc}
                onChange={(e) => setDesc(e.currentTarget.value)}
                autoComplete="role-desc"
              />
            </div>
          </Card.Section>
        </Card>
      </div>
    </div>
  );
};

export default EditRoleForm;
