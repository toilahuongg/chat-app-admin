import express from 'express';
import { authentication } from '@server/middlewares/auth.middleware';
import validate from '@server/validators';
import { createGroupValidator, deleteGroupValidator, updateGroupValidator } from '@server/validators/group.validator';
import GroupController from '@server/controllers/group.controller';
import { detectException } from '@server/middlewares';
import { paginationValidator } from '@server/validators/pagination.validator';
import messageRouter from './messages';

const groupRouter = express.Router();

groupRouter.get('/groups', authentication, validate(paginationValidator), detectException(GroupController.pagination));
groupRouter.get('/groups/:group_id', authentication, detectException(GroupController.findById));

groupRouter.post('/groups', authentication, validate(createGroupValidator), detectException(GroupController.create));
groupRouter.put(
  '/groups/:group_id',
  authentication,
  validate(updateGroupValidator),
  detectException(GroupController.update),
);
groupRouter.delete(
  '/groups/:group_id',
  authentication,
  validate(deleteGroupValidator),
  detectException(GroupController.delete),
);

groupRouter.use(messageRouter);
export default groupRouter;
