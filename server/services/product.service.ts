import { NotFoundError } from '@server/core/error.response';
import ProductModel from '@server/models/product.model';
import { TProduct } from '@server/schema/product.schema';
import { Types } from 'mongoose';

export default class ProductService {
  static async findAll() {
    const newProduct = await ProductModel.find();
    return newProduct;
  }

  static async findById(id: Types.ObjectId) {
    const newProduct = await ProductModel.findById(id).lean();
    return newProduct;
  }

  static async create(body: TProduct, accountId: Types.ObjectId) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...product } = body;
    const newProduct = await ProductModel.create({ ...product, accountId });
    return newProduct;
  }

  static async update(id: Types.ObjectId, body: TProduct) {
    const product = await ProductModel.findOneAndUpdate({ _id: id }, { ...body }, { new: true }).lean();
    if (!product) throw new NotFoundError(' not found');
    return product;
  }

  static async delete(id: Types.ObjectId) {
    const product = await ProductModel.findByIdAndRemove(id);
    if (!product) throw new NotFoundError(' not found');
    return { id: product._id };
  }
}
