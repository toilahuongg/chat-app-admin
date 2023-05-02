import { Card, Checkbox, Input, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import useStore from './loginStore';
import { SCOPES } from '@server/utils/scopes';
import { toastResponse } from '@src/utils/toast';
import Button from '@src/components/Button';

const LoginForm = () => {
  const { account, password, isRememberMe, isLoading, updateAccount, updatePassword, toggleIsRememberMe, fetchLogin } =
    useStore((state) => state);

  const handleSubmit = () =>
    toastResponse(
      fetchLogin().then(({ message, metadata }) => {
        const { tokens, user, deviceId } = metadata;
        if (!user.scopes.includes(SCOPES.ACCESS_ADMINISTRATION)) throw new Error('Access denied!');
        const { accessToken, refreshToken } = tokens;
        window.localStorage.setItem('accessToken', accessToken);
        window.localStorage.setItem('refreshToken', refreshToken);
        window.localStorage.setItem('deviceId', deviceId);
        window.localStorage.setItem('clientId', user._id);
        window.location.href = '/admin';
        return message!;
      }),
    );

  return (
    <Card color="transparent" shadow={false}>
      <Typography className="text-center uppercase font-bold" variant="h1" color="blue-gray">
        Sign in
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Email"
            value={account}
            onChange={(e) => updateAccount(e.target.value)}
            autoComplete="username"
          />
          <Input
            type="password"
            size="lg"
            label="Password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => updatePassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center">
          <Checkbox
            label={
              <Typography variant="small" color="gray" className="flex items-center font-normal">
                Remember me
              </Typography>
            }
            containerProps={{ className: '-ml-2.5' }}
            checked={isRememberMe}
            onChange={toggleIsRememberMe}
          />
          <Typography color="gray" className="font-medium text-blue-500 transition-colors hover:text-blue-700">
            <Link href="/forgot-password">Forgot password?</Link>
          </Typography>
        </div>
        <Button type="submit" className="mt-6" isLoading={isLoading} fullWidth>
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;
