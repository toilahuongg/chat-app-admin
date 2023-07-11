import express from 'express';
import AccountController from '@server/controllers/account.controller';
import { detectException } from '@server/middlewares';
import validate from '@server/validators';
import {
  changeInformationValidator,
  changePasswordValidator,
  loginValidator,
  createAccountValidator,
  editAccountValidator,
  findByIdValidator,
} from '@server/validators/account.validator';
import { authentication } from '@server/middlewares/auth.middleware';
import appConfig from '@server/configs/app.config';
import detectDevice from '@server/middlewares/device.middleware';
import { accessScopes } from '@server/middlewares/role.middleware';
import { SCOPES } from '@server/utils/scopes';
import { paginationValidator } from '@server/validators/pagination.validator';

const accountRouter = express.Router();

// router.post(
//   '/accounts/signup',
//   detectDevice,
//   validate(createAccountValidator),
//   detectException(AccountController.signUp),
// );

accountRouter.post('/accounts/login', detectDevice, validate(loginValidator), detectException(AccountController.login));

if (!appConfig.app.isProd) {
  accountRouter.get('/accounts/check-auth', authentication, (req, res) => {
    return res.json({ id: req.accountId });
  });
}

accountRouter.post('/accounts/refresh-token', authentication, detectException(AccountController.refreshToken));
accountRouter.get('/accounts/me', authentication, detectException(AccountController.getInformation));
accountRouter.get(
  '/accounts/:id',
  authentication,
  accessScopes([SCOPES.READ_ACCOUNTS, SCOPES.WRITE_ACCOUNTS]),
  validate(findByIdValidator),
  detectException(AccountController.findById),
);
accountRouter.get(
  '/accounts',
  authentication,
  validate(paginationValidator),
  detectException(AccountController.pagination),
);

accountRouter.patch(
  '/accounts/change-password',
  authentication,
  validate(changePasswordValidator),
  detectException(AccountController.changePassword),
);

accountRouter.patch(
  '/accounts/change-information',
  authentication,
  validate(changeInformationValidator),
  detectException(AccountController.changeInformation),
);

accountRouter.post(
  '/accounts/create',
  authentication,
  accessScopes([SCOPES.WRITE_ACCOUNTS]),
  validate(createAccountValidator),
  detectException(AccountController.create),
);

accountRouter.put(
  '/accounts/:id',
  authentication,
  accessScopes([SCOPES.WRITE_ACCOUNTS]),
  validate(editAccountValidator),
  detectException(AccountController.edit),
);

accountRouter.delete(
  '/accounts/:id',
  authentication,
  accessScopes([SCOPES.WRITE_ACCOUNTS]),
  detectException(AccountController.delete),
);

accountRouter.post('/accounts/logout', authentication, detectException(AccountController.logout));
export default accountRouter;
