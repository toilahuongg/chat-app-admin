import { TCollection } from '@server/schema/collection.schema';
import { Schema, model } from 'mongoose';
import AccountModel from './account.model';

const DOCUMENT_NAME = 'Collection';
const COLLECTION_NAME = 'Collections';
const CollectionSchema = new Schema<TCollection>(
  {
    title: { type: String },
    description: { type: String },
    slug: { type: String },
    account: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: AccountModel.modelName,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);
const CollectionModel = model<TCollection>(DOCUMENT_NAME, CollectionSchema);
export default CollectionModel;
