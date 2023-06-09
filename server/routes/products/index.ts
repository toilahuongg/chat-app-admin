import ProductController from '@server/controllers/product.controller';
import { detectException } from '@server/middlewares';
import { authentication } from '@server/middlewares/auth.middleware';
import { accessScopes } from '@server/middlewares/role.middleware';
import { SCOPES } from '@server/utils/scopes';
import express from 'express';

const router = express.Router();
router.get('/products', detectException(ProductController.findAll));
router.get('/products/:id', detectException(ProductController.findById));

router.post(
  '/products',
  authentication,
  accessScopes([SCOPES.WRITE_PRODUCTS]),
  detectException(ProductController.create),
);
router.put(
  '/products/:id',
  authentication,
  accessScopes([SCOPES.WRITE_PRODUCTS]),
  detectException(ProductController.update),
);
router.delete(
  '/products/:id',
  authentication,
  accessScopes([SCOPES.WRITE_PRODUCTS]),
  detectException(ProductController.delete),
);
export default router;
