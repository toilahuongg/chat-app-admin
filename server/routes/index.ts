import express from 'express';
import accountsRouter from './accounts';
import rolesRouter from './roles';
import { TInputError } from '@server/schema/response.schema';
import ErrorResponse from '@server/core/error.response';
const router = express.Router();

router.use(accountsRouter);
router.use(rolesRouter);

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = new ErrorResponse({ message: 'Not found', statusCode: 404 });
  next(error);
});
router.use((error: TInputError, req: express.Request, res: express.Response, _: express.NextFunction) => {
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
