import express from 'express';
import accessController from '@server/controllers/account.controller';
import { detectException } from '@server/middlewares';
import validate from '@server/validators';
import {
  changeInformationValidator,
  changePasswordValidator,
  loginValidator,
  signUpValidator,
} from '@server/validators/account.validator';
import { authentication } from '@server/middlewares/auth.middleware';
import appConfig from '@server/configs/app.config';
import detectDevice from '@server/middlewares/device.middleware';

const router = express.Router();

router.post('/accounts/signup', detectDevice, validate(signUpValidator), detectException(accessController.signUp));

router.post('/accounts/login', detectDevice, validate(loginValidator), detectException(accessController.login));

router.use(authentication);
if (!appConfig.app.isProd) {
  router.get('/accounts/check-auth', (req, res) => {
    return res.json({ id: req.accountId });
  });
}

router.post('/accounts/refresh-token', detectException(accessController.refreshToken));

router.put(
  '/accounts/change-password',
  validate(changePasswordValidator),
  detectException(accessController.changePassword),
);

router.put(
  '/accounts/change-information',
  validate(changeInformationValidator),
  detectException(accessController.changeInformation),
);

router.post('/accounts/logout', detectException(accessController.logout));
export default router;
