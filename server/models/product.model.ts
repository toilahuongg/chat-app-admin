import { TProduct, TProductOption, TProductOptionItem, TProductVariant } from '@server/schema/product.schema';
import { Schema, model } from 'mongoose';
import AccountModel from './account.model';
import CollectionModel from './productCategory.model';

const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const OptionItemSchema = new Schema<TProductOptionItem>({
  label: { type: String },
  value: { type: String },
});

const OptionSchema = new Schema<TProductOption>({
  name: { type: String },
  values: [OptionItemSchema],
});

const VariantSchema = new Schema<TProductVariant>({
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
    account: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: AccountModel.modelName,
    },
    collections: { type: [Schema.Types.ObjectId], ref: CollectionModel.modelName },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);
const ProductModel = model<TProduct>(DOCUMENT_NAME, ProductSchema);
export default ProductModel;
