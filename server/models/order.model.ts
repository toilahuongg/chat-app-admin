import { TOrder, TProductOrder } from '@server/schema/order.schema';
import { Schema, model } from 'mongoose';
import AccountModel from './account.model';
import ProductModel from './product.model';

const DOCUMENT_NAME = 'Order';
const COLLECTION_NAME = 'Orders';

const ProductOrderSchema = new Schema<TProductOrder>({
  productId: { type: Schema.Types.ObjectId, required: true, ref: ProductModel.modelName },
  quantity: { type: Number },
  price: { type: Number },
});

const OrderSchema = new Schema<TOrder>(
  {
    detail: { type: String },
    products: { type: [ProductOrderSchema] },
    total: { type: Number },
    accountId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: AccountModel.modelName,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME },
);

const OrderModel = model<TOrder>(DOCUMENT_NAME, OrderSchema);
export default OrderModel;
