import { NotFoundError } from '@server/core/error.response';
import RoleModel from '@server/models/role.model';
import { createRoleValidator, updateRoleValidator } from '@server/validators/role.validator';
import { Types } from 'mongoose';
import { z } from 'zod';

export default class RoleService {
  static async findAll() {
    const newRole = await RoleModel.find();
    return newRole;
  }

  static async findById(id: Types.ObjectId) {
    const newRole = await RoleModel.findById(id).lean();
    return newRole;
  }

  static async createRole(body: z.infer<typeof createRoleValidator.shape.body>) {
    const newRole = await RoleModel.create({ ...body });
    return newRole;
  }

  static async updateRole(id: Types.ObjectId, body: z.infer<typeof updateRoleValidator.shape.body>) {
    const roleUpdated = await RoleModel.findOneAndUpdate({ _id: id }, { ...body }, { new: true }).lean();
    if (!roleUpdated) throw new NotFoundError('Role not found');
    return roleUpdated;
  }

  static async deleteRole(id: Types.ObjectId) {
    const roleUpdated = await RoleModel.findByIdAndRemove(id);
    if (!roleUpdated) throw new NotFoundError('Role not found');
    return { roleId: roleUpdated._id };
  }
}
