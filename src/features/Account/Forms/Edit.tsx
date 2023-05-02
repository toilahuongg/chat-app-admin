import { Checkbox, Input, Typography } from '@material-tailwind/react';
import { TSuccessResponse } from '@server/schema/response.schema';
import { SCOPES } from '@server/utils/scopes';
import { Role } from '@src/features/Role/store';
import instance from '@src/utils/instance';
import useSWR from 'swr';
import { useStore } from 'zustand';
import { useAccountStore } from '../providers';
import { accountStore } from '../store';

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
    setFirstName,
    setLastName,
    setPassword,
    setPhoneNumber,
    setUsername,
    toggleRoles,
  } = useStore(accountStore, (state) => state);

  const { email, roles, username, address, confirmPassword, firstName, lastName, password, phoneNumber } = account;
  return (
    <form className="flex flex-col gap-6">
      <Typography variant="h4" className="text-black">
        Account
      </Typography>
      <div className="grid grid-cols-2 gap-6">
        <Input
          label="Username"
          variant="static"
          size="lg"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          placeholder="Enter username..."
          autoComplete="username"
          required
        />
        <Input
          variant="static"
          size="lg"
          label="Email"
          type="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="Enter email..."
          autoComplete="email"
          required
        />

        <Input
          type="password"
          variant="static"
          size="lg"
          label="Password"
          value={password || ''}
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Enter password..."
          autoComplete="new-password"
          required
        />
        <Input
          type="password"
          variant="static"
          size="lg"
          label="Confirm password"
          value={confirmPassword || ''}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          placeholder="Enter confirm password..."
          autoComplete="confirm-password"
          required
        />
      </div>
      <Typography variant="h4" className="text-black">
        Information
      </Typography>
      <div className="grid grid-cols-2 gap-6">
        <Input
          label="Firstname"
          variant="static"
          size="lg"
          value={firstName || ''}
          onChange={(e) => setFirstName(e.currentTarget.value)}
          autoComplete="firstname"
          placeholder="Enter Firstname..."
        />
        <Input
          variant="static"
          size="lg"
          label="Lastname"
          value={lastName || ''}
          onChange={(e) => setLastName(e.currentTarget.value)}
          autoComplete="lastname"
          placeholder="Enter Lastname..."
        />
        <Input
          label="Address"
          variant="static"
          size="lg"
          value={address || ''}
          onChange={(e) => setAddress(e.currentTarget.value)}
          autoComplete="address"
          placeholder="Enter Address..."
        />
        <Input
          variant="static"
          size="lg"
          label="Phone number"
          value={phoneNumber || ''}
          onChange={(e) => setPhoneNumber(e.currentTarget.value)}
          autoComplete="phone-number"
          placeholder="Enter Phone number..."
        />
      </div>
      {scopes.includes(SCOPES.MANAGER_ROLE_ACCOUNTS) && (
        <>
          <Typography variant="h4" className="text-black">
            Roles
          </Typography>
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
        </>
      )}
    </form>
  );
};

export default EditAccountForm;
