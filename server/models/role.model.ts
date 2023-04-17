import { TRole } from '@server/schema/role.schema';
import { Schema, model } from 'mongoose';

const DOCUMENT_NAME = 'Role';
const COLLECTION_NAME = 'Roles';

const roleSchema = new Schema<TRole>(
  {
    name: { type: String, required: true, unique: true },
    desc: { type: String },
    scopes: { type: [String], default: [] },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);

const RoleModel = model<TRole>(DOCUMENT_NAME, roleSchema);

export default RoleModel;
