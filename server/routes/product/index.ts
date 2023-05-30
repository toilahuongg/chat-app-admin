import ProductController from '@server/controllers/product.controller';
import { detectException } from '@server/middlewares';
import { authentication } from '@server/middlewares/auth.middleware';
import { accessScopes } from '@server/middlewares/role.middleware';
import { SCOPES } from '@server/utils/scopes';
import express from 'express';

const router = express.Router();
router.use(authentication);

router.get(
  '/products',
  accessScopes([SCOPES.READ_PRODUCT_CATEGORIES, SCOPES.WRITE_PRODUCT_CATEGORIES]),
  detectException(ProductController.findAll),
);
router.get(
  '/products/:id',
  accessScopes([SCOPES.READ_PRODUCT_CATEGORIES]),
  detectException(ProductController.findById),
);

router.post(
  '/products',
  accessScopes([SCOPES.WRITE_PRODUCT_CATEGORIES]),
  detectException(ProductController.createProduct),
);
router.put(
  '/products/:id',
  accessScopes([SCOPES.WRITE_PRODUCT_CATEGORIES]),
  detectException(ProductController.updateProduct),
);
router.delete(
  '/products/:id',
  accessScopes([SCOPES.WRITE_PRODUCT_CATEGORIES]),
  detectException(ProductController.deleteProduct),
);
export default router;
