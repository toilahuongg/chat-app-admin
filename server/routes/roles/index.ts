import express from 'express';
import { authentication } from '@server/middlewares/auth.middleware';
import { accessScopes } from '@server/middlewares/role.middleware';
import { SCOPES } from '@server/utils/scopes';
import validate from '@server/validators';
import { createRoleValidator, deleteRoleValidator, updateRoleValidator } from '@server/validators/role.validator';
import RoleController from '@server/controllers/role.controller';
import { detectException } from '@server/middlewares';

const roleRouter = express.Router();

roleRouter.get(
  '/roles',
  authentication,
  accessScopes([SCOPES.READ_ROLES, SCOPES.WRITE_ROLES]),
  detectException(RoleController.findAll),
);
roleRouter.get(
  '/roles/:role_id',
  authentication,
  accessScopes([SCOPES.READ_ROLES]),
  detectException(RoleController.findById),
);

roleRouter.post(
  '/roles',
  authentication,
  accessScopes([SCOPES.WRITE_ROLES]),
  validate(createRoleValidator),
  detectException(RoleController.create),
);
roleRouter.put(
  '/roles/:role_id',
  authentication,
  accessScopes([SCOPES.WRITE_ROLES]),
  validate(updateRoleValidator),
  detectException(RoleController.update),
);
roleRouter.delete(
  '/roles/:role_id',
  authentication,
  accessScopes([SCOPES.WRITE_ROLES]),
  validate(deleteRoleValidator),
  detectException(RoleController.delete),
);
export default roleRouter;
