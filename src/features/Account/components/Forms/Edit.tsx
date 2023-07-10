import { Checkbox, Input } from '@material-tailwind/react';
import { TSuccessResponse } from '@server/schema/response.schema';
import { SCOPES } from '@server/utils/scopes';
import Card from '@src/components/Card';
import { Role } from '@src/features/Role/types';
import instance from '@src/utils/instance';
import useSWR from 'swr';
import { useStore } from 'zustand';
import { useAccountStore } from '../../providers';
import { accountStore } from '../../store';

const EditAccountForm = () => {
  const { data, isLoading } = useSWR('/roles', (url) =>
    instance.get<TSuccessResponse<Role[]>>(url).then(({ data }) => data.metadata),
  );
  const scopes = useAccountStore((state) => state.account.scopes);
  const {
    account,
    setAddress,
    setConfirmPassword,
    setEmail,
    setFullname,
    setPassword,
    setPhoneNumber,
    setUsername,
    toggleRoles,
  } = useStore(accountStore, (state) => state);

  const { email, roles, username, address, confirmPassword, fullname, password, phoneNumber } = account;
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <Card.Section title="Tài khoản">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Username"
              variant="outlined"
              size="lg"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              autoComplete="username"
              required
            />
            <Input
              variant="outlined"
              size="lg"
              label="Email"
              type="Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              autoComplete="email"
              required
            />

            <Input
              type="password"
              variant="outlined"
              size="lg"
              label="Password"
              value={password || ''}
              onChange={(e) => setPassword(e.currentTarget.value)}
              autoComplete="new-password"
              required
            />
            <Input
              type="password"
              variant="outlined"
              size="lg"
              label="Confirm password"
              value={confirmPassword || ''}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              autoComplete="confirm-password"
              required
            />
          </div>
        </Card.Section>
      </Card>
      <Card>
        <Card.Section title="Thông tin">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Address"
              variant="outlined"
              size="lg"
              value={address || ''}
              onChange={(e) => setAddress(e.currentTarget.value)}
              autoComplete="address"
            />
            <Input
              variant="outlined"
              size="lg"
              label="Phone number"
              value={phoneNumber || ''}
              onChange={(e) => setPhoneNumber(e.currentTarget.value)}
              autoComplete="phone-number"
            />
            <Input
              label="Fullname"
              variant="outlined"
              size="lg"
              value={fullname || ''}
              onChange={(e) => setFullname(e.currentTarget.value)}
              autoComplete="Fullname"
            />
          </div>
        </Card.Section>
      </Card>

      {scopes.includes(SCOPES.MANAGER_ROLE_ACCOUNTS) && (
        <Card>
          <Card.Section title="Quyền">
            <div className="grid grid-cols-2 gap-3">
              {isLoading
                ? 'Loading...'
                : data?.map((item) => (
                    <Checkbox
                      key={item._id}
                      label={item.name}
                      id={item._id}
                      checked={roles?.includes(item._id)}
                      onChange={() => toggleRoles(item._id)}
                    />
                  ))}
            </div>
          </Card.Section>
        </Card>
      )}
    </div>
  );
};

export default EditAccountForm;
