import { union } from 'lodash';
import AccountService from '@server/services/account.service';
import { detectException } from '.';
import { ForbiddenError } from '@server/core/error.response';

export const detechRoles = detectException(async (req, res, next) => {
  const roles = await AccountService.getRolesById(req.accountId!);
  const scopes = union(...roles.map((role) => role.scopes));
  req.scopes = scopes;
  return next();
});

export const accessScopes = (scopes: string[]) => {
  return detectException(async (req, res, next) => {
    const notAllow = scopes.some((scope) => !req.scopes?.includes(scope));
    if (notAllow) throw new ForbiddenError();
    return next();
  });
};
