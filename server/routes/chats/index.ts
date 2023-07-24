import express from 'express';
import { authentication } from '@server/middlewares/auth.middleware';
import validate from '@server/validators';
import {
  createChatValidator,
  deleteChatValidator,
  updateChatValidator,
  updateLastSeenValidator,
} from '@server/validators/chat.validator';
import ChatController from '@server/controllers/chat.controller';
import { detectException } from '@server/middlewares';
import { paginationValidator } from '@server/validators/pagination.validator';
import messageRouter from './messages';

const chatRouter = express.Router();

chatRouter.get('/chats', authentication, validate(paginationValidator), detectException(ChatController.pagination));
chatRouter.get('/chats/:chat_id', authentication, detectException(ChatController.findById));

chatRouter.post('/chats', authentication, validate(createChatValidator), detectException(ChatController.create));
chatRouter.put(
  '/chats/:chat_id',
  authentication,
  validate(updateChatValidator),
  detectException(ChatController.update),
);

chatRouter.patch(
  '/chats/:chat_id/update-last-seen',
  authentication,
  validate(updateLastSeenValidator),
  detectException(ChatController.updateLastSeen),
);

chatRouter.delete(
  '/chats/:chat_id',
  authentication,
  validate(deleteChatValidator),
  detectException(ChatController.delete),
);

chatRouter.use(messageRouter);
export default chatRouter;
