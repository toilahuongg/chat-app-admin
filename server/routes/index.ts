import ErrorResponse from '@server/core/error.response';
import { OK } from '@server/core/success.response';
import { upload } from '@server/helpers/multer';
import { TErrorResponse } from '@server/schema/response.schema';
import express from 'express';
import accountsRouter from './accounts';
import rolesRouter from './roles';
import dashboardRouter from './dashboard';

const router = express.Router();
router.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.file!.filename;
  res.json(new OK({ metadata: { url: imageUrl }, message: 'Upload successfully' }));
});

router.use(accountsRouter);
router.use(rolesRouter);
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
