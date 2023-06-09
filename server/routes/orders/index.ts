import OrderController from '@server/controllers/order.controller';
import { detectException } from '@server/middlewares';
import { authentication } from '@server/middlewares/auth.middleware';
import { accessScopes } from '@server/middlewares/role.middleware';
import { SCOPES } from '@server/utils/scopes';
import express from 'express';

const router = express.Router();
router.get('/orders', authentication, detectException(OrderController.findAll));
router.get('/orders/:id', authentication, detectException(OrderController.findById));
router.post('/orders', authentication, accessScopes([SCOPES.WRITE_ORDERS]), detectException(OrderController.create));
router.put('/orders/:id', authentication, accessScopes([SCOPES.WRITE_ORDERS]), detectException(OrderController.update));
router.delete(
  '/orders/:id',
  authentication,
  accessScopes([SCOPES.WRITE_ORDERS]),
  detectException(OrderController.delete),
);
export default router;
