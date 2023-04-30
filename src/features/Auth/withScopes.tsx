/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAccountStore } from '../Account/providers';

export function withScopes(Component: any, scopes: string[]) {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const _scopes = useAccountStore((state) => state.account.scopes);
    if (!scopes.some((scope) => _scopes.includes(scope))) return <div> Access denied</div>;
    return <Component {...props} />;
  };
}
