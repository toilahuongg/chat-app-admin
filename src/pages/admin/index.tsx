import { Typography } from '@material-tailwind/react';
import { SCOPES } from '@server/utils/scopes';
import Card from '@src/components/Card';
import { withScopes } from '@src/features/Auth/withScopes';

const AdminPage = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <Card.Section>
            <Typography variant="h3" className="text-4xl" color="green" textGradient>
              100
            </Typography>
            <Typography as="paragraph" className="mt-2 text-2xl font-medium">
              Tài khoản
            </Typography>
          </Card.Section>
        </Card>
        <Card>
          <Card.Section>
            <Typography variant="h3" className="text-4xl" color="blue-gray" textGradient>
              13
            </Typography>
            <Typography as="paragraph" className="mt-2 text-2xl font-medium">
              Bài viết
            </Typography>
          </Card.Section>
        </Card>
      </div>
      <div className="mt-20"></div>
      <div className="mt-4" />
    </div>
  );
};

export default withScopes(AdminPage, [SCOPES.ACCESS_ADMINISTRATION]);
