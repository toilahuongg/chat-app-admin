import express from 'express';
import { authentication } from '@server/middlewares/auth.middleware';
import { SCOPES } from '@server/utils/scopes';
import validate from '@server/validators';
import {
  createProductCategoryValidator,
  deleteProductCategoryValidator,
  updateProductCategoryValidator,
} from '@server/validators/productCategory.validator';
import { detectException } from '@server/middlewares';
import ProductCategoryController from '@server/controllers/productCategory.controller';
import { accessScopes } from '@server/middlewares/role.middleware';

const router = express.Router();

router.get(
  '/product-categories',
  authentication,
  accessScopes([SCOPES.READ_PRODUCT_CATEGORIES, SCOPES.WRITE_PRODUCT_CATEGORIES]),
  detectException(ProductCategoryController.findAll),
);
router.get(
  '/product-categories/:id',
  authentication,
  accessScopes([SCOPES.READ_PRODUCT_CATEGORIES]),
  detectException(ProductCategoryController.findById),
);

router.post(
  '/product-categories',
  authentication,
  accessScopes([SCOPES.WRITE_PRODUCT_CATEGORIES]),
  validate(createProductCategoryValidator),
  detectException(ProductCategoryController.create),
);
router.put(
  '/product-categories/:id',
  authentication,
  accessScopes([SCOPES.WRITE_PRODUCT_CATEGORIES]),
  validate(updateProductCategoryValidator),
  detectException(ProductCategoryController.update),
);
router.delete(
  '/product-categories/:id',
  authentication,
  accessScopes([SCOPES.WRITE_PRODUCT_CATEGORIES]),
  validate(deleteProductCategoryValidator),
  detectException(ProductCategoryController.delete),
);
export default router;
