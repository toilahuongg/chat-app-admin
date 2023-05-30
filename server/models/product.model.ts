import { TProduct, TProductOption, TProductOptionItem, TProductVariant } from '@server/schema/product.schema';
import { Schema, model } from 'mongoose';
import AccountModel from './account.model';
import CollectionModel from './productCategory.model';

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const OptionItemSchema = new Schema<TProductOptionItem>({
  id: { type: String },
  label: { type: String },
  value: { type: String },
});

const OptionSchema = new Schema<TProductOption>({
  id: { type: String },
  name: { type: String },
  values: [OptionItemSchema],
});

const VariantSchema = new Schema<TProductVariant>({
  id: { type: String },
  title: { type: String },
  price: { type: Number },
  compareAtPrice: { type: Number },
  sku: { type: String },
  options: { type: [String] },
});

const ProductSchema = new Schema<TProduct>(
  {
    title: { type: String },
    description: { type: String },
    slug: { type: String },
    price: { type: Number },
    compareAtPrice: { type: Number },
    tags: { type: [String], default: [] },
    status: { type: String },
    options: [OptionSchema],
    variants: [VariantSchema],
    media: { type: [String], default: [] },
    accountId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: AccountModel.modelName,
    },
    categoryId: { type: Schema.Types.ObjectId, ref: CollectionModel.modelName },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);
const ProductModel = model<TProduct>(DOCUMENT_NAME, ProductSchema);
export default ProductModel;
