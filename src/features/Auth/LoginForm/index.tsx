'use client';

import { Button, Card, Checkbox, Input, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import useStore from './loginStore';
import { SCOPES } from '@server/utils/scopes';
import { toastResponse } from '@src/utils/toast';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const { account, password, isRememberMe, updateAccount, updatePassword, toggleIsRememberMe, fetchLogin } = useStore(
    (state) => state,
  );

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
        router.push('/admin');
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
          <Input size="lg" label="Email" value={account} onChange={(e) => updateAccount(e.target.value)} />
          <Input
            type="password"
            size="lg"
            label="Password"
            value={password}
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
        <Button type="submit" className="mt-6" fullWidth>
          Login
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;
