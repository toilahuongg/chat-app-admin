import MessageController from '@server/controllers/message.controller';
import { detectException } from '@server/middlewares';
import { authentication } from '@server/middlewares/auth.middleware';
import validate from '@server/validators';
import { createMessageValidator, paginationMessagesValidator } from '@server/validators/message.validator';
import express from 'express';

const messageRouter = express.Router();

messageRouter.get(
  '/chats/:chat_id/messages',
  authentication,
  validate(paginationMessagesValidator),
  detectException(MessageController.pagination),
);

messageRouter.post(
  '/chats/:chat_id/messages',
  authentication,
  validate(createMessageValidator),
  detectException(MessageController.create),
);
export default messageRouter;
