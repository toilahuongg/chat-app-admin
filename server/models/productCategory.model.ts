import { TProductCategory } from '@server/schema/productCategory.schema';
import { Schema, model } from 'mongoose';
import AccountModel from './account.model';

const DOCUMENT_NAME = 'ProductCategory';
const COLLECTION_NAME = 'ProductCategories';
const ProductCategorySchema = new Schema<TProductCategory>(
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
const ProductCategoryModel = model<TProductCategory>(DOCUMENT_NAME, ProductCategorySchema);
export default ProductCategoryModel;
