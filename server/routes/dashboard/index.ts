import AdminController from '@server/controllers/admin.controller';
import { detectException } from '@server/middlewares';
import { authentication } from '@server/middlewares/auth.middleware';
import express from 'express';

const router = express.Router();
router.get('/analytics/top-customers', authentication, detectException(AdminController.getTopCustomers));
router.get('/analytics/top-products', authentication, detectException(AdminController.getTopProducts));
export default router;
