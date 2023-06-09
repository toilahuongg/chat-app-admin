import express from 'express';
import AccountController from '@server/controllers/account.controller';
import { detectException } from '@server/middlewares';
import validate from '@server/validators';
import {
  changeInformationValidator,
  changePasswordValidator,
  findAllUsersValidator,
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

const router = express.Router();

// router.post(
//   '/accounts/signup',
//   detectDevice,
//   validate(createAccountValidator),
//   detectException(AccountController.signUp),
// );

router.post('/accounts/login', detectDevice, validate(loginValidator), detectException(AccountController.login));

if (!appConfig.app.isProd) {
  router.get('/accounts/check-auth', authentication, (req, res) => {
    return res.json({ id: req.accountId });
  });
}

router.post('/accounts/refresh-token', authentication, detectException(AccountController.refreshToken));
router.get('/accounts/me', authentication, detectException(AccountController.getInformation));
router.get(
  '/accounts/:id',
  authentication,
  accessScopes([SCOPES.READ_ACCOUNTS, SCOPES.WRITE_ACCOUNTS]),
  validate(findByIdValidator),
  detectException(AccountController.findById),
);
router.get(
  '/accounts',
  authentication,
  validate(findAllUsersValidator),
  detectException(AccountController.findAllUsers),
);

router.patch(
  '/accounts/change-password',
  authentication,
  validate(changePasswordValidator),
  detectException(AccountController.changePassword),
);

router.patch(
  '/accounts/change-information',
  authentication,
  validate(changeInformationValidator),
  detectException(AccountController.changeInformation),
);

router.post(
  '/accounts/create',
  authentication,
  accessScopes([SCOPES.WRITE_ACCOUNTS]),
  validate(createAccountValidator),
  detectException(AccountController.create),
);

router.put(
  '/accounts/:id',
  authentication,
  accessScopes([SCOPES.WRITE_ACCOUNTS]),
  validate(editAccountValidator),
  detectException(AccountController.edit),
);

router.delete(
  '/accounts/:id',
  authentication,
  accessScopes([SCOPES.WRITE_ACCOUNTS]),
  detectException(AccountController.delete),
);

router.post('/accounts/logout', authentication, detectException(AccountController.logout));
export default router;
