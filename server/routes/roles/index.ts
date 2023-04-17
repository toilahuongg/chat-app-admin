import express from 'express';
import { authentication } from '@server/middlewares/auth.middleware';
import { accessScopes, detechRoles } from '@server/middlewares/role.middleware';
import { SCOPES } from '@server/utils/scopes';
import validate from '@server/validators';
import { createRoleValidator, deleteRoleValidator, updateRoleValidator } from '@server/validators/role.validator';
import RoleController from '@server/controllers/role.controller';
import { detectException } from '@server/middlewares';

const router = express.Router();
router.use(authentication, detechRoles);

router.post(
  '/roles',
  accessScopes([SCOPES.WRITE_ROLES]),
  validate(createRoleValidator),
  detectException(RoleController.createRole),
);
router.put(
  '/roles/:role_id',
  accessScopes([SCOPES.WRITE_ROLES]),
  validate(updateRoleValidator),
  detectException(RoleController.updateRole),
);
router.delete(
  '/roles/:role_id',
  accessScopes([SCOPES.WRITE_ROLES]),
  validate(deleteRoleValidator),
  detectException(RoleController.deleteRole),
);
export default router;
