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
router.use(authentication);

router.get(
  '/products/categories',
  accessScopes([SCOPES.READ_PRODUCT_CATEGORIES, SCOPES.WRITE_PRODUCT_CATEGORIES]),
  detectException(ProductCategoryController.findAll),
);
router.get(
  '/products/categories/:id',
  accessScopes([SCOPES.READ_PRODUCT_CATEGORIES]),
  detectException(ProductCategoryController.findById),
);

router.post(
  '/products/categories',
  accessScopes([SCOPES.WRITE_PRODUCT_CATEGORIES]),
  validate(createProductCategoryValidator),
  detectException(ProductCategoryController.createProductCategory),
);
router.put(
  '/products/categories/:id',
  accessScopes([SCOPES.WRITE_PRODUCT_CATEGORIES]),
  validate(updateProductCategoryValidator),
  detectException(ProductCategoryController.updateProductCategory),
);
router.delete(
  '/products/categories/:id',
  accessScopes([SCOPES.WRITE_PRODUCT_CATEGORIES]),
  validate(deleteProductCategoryValidator),
  detectException(ProductCategoryController.deleteProductCategory),
);
export default router;
