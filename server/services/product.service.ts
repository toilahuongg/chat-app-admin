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

  static async createProduct(body: TProduct, accountId: Types.ObjectId) {
    const { _id, ...product } = body;
    const newProduct = await ProductModel.create({ ...product, accountId });
    return newProduct;
  }

  static async updateProduct(id: Types.ObjectId, body: TProduct) {
    const product = await ProductModel.findOneAndUpdate({ _id: id }, { ...body }, { new: true }).lean();
    if (!product) throw new NotFoundError(' not found');
    return product;
  }

  static async deleteProduct(id: Types.ObjectId) {
    const product = await ProductModel.findByIdAndRemove(id);
    if (!product) throw new NotFoundError(' not found');
    return { Id: product._id };
  }
}
