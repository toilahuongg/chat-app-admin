import ImageController from '@server/controllers/Image.controller';
import { upload } from '@server/helpers/multer';
import { detectException } from '@server/middlewares';
import { authentication } from '@server/middlewares/auth.middleware';
import express from 'express';

const imageRouter = express.Router();

imageRouter.post('/images/upload', authentication, upload.single('image'), detectException(ImageController.upload));

export default imageRouter;
