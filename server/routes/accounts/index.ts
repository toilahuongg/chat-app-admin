import express from 'express';
import AccountController from '@server/controllers/account.controller';
import { detectException } from '@server/middlewares';
import validate from '@server/validators';
import {
  changeInformationValidator,
  changePasswordValidator,
  findAllUsersValidator,
  loginValidator,
  signUpValidator,
} from '@server/validators/account.validator';
import { authentication } from '@server/middlewares/auth.middleware';
import appConfig from '@server/configs/app.config';
import detectDevice from '@server/middlewares/device.middleware';

const router = express.Router();

router.post('/accounts/signup', detectDevice, validate(signUpValidator), detectException(AccountController.signUp));

router.post('/accounts/login', detectDevice, validate(loginValidator), detectException(AccountController.login));

router.use(authentication);
if (!appConfig.app.isProd) {
  router.get('/accounts/check-auth', (req, res) => {
    return res.json({ id: req.accountId });
  });
}

router.post('/accounts/refresh-token', detectException(AccountController.refreshToken));
router.get('/accounts/me', detectException(AccountController.getInformation));
router.get('/accounts', validate(findAllUsersValidator), detectException(AccountController.findAllUsers));

router.patch(
  '/accounts/change-password',
  validate(changePasswordValidator),
  detectException(AccountController.changePassword),
);

router.patch(
  '/accounts/change-information',
  validate(changeInformationValidator),
  detectException(AccountController.changeInformation),
);

router.post('/accounts/logout', detectException(AccountController.logout));
export default router;
