import ErrorResponse from '@server/core/error.response';
import { TErrorResponse } from '@server/schema/response.schema';
import express from 'express';
import accountRouter from './accounts';
import dashboardRouter from './dashboard';
import groupRouter from './groups';
import roleRouter from './roles';
import imageRouter from './images';

const router = express.Router();

router.use(accountRouter);
router.use(roleRouter);
router.use(groupRouter);
router.use(imageRouter);
router.use(dashboardRouter);

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = new ErrorResponse({ message: 'Not found', statusCode: 404 });
  next(error);
});
router.use((error: TErrorResponse, req: express.Request, res: express.Response, _: express.NextFunction) => {
  const { statusCode, message } = error;
  const code = statusCode || 500;
  const errorMessage = message || 'Internal Server Error';
  return res.status(code).json({
    status: 'error',
    statusCode: code,
    message: errorMessage,
  });
});

export default router;
