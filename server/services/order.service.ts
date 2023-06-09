import { NotFoundError } from '@server/core/error.response';
import OrderModel from '@server/models/order.model';
import { TOrder } from '@server/schema/order.schema';
import { Types } from 'mongoose';

export default class OrderService {
  static async findAll() {
    const newOrder = await OrderModel.find();
    return newOrder;
  }

  static async findById(id: Types.ObjectId) {
    const newOrder = await OrderModel.findById(id).lean();
    return newOrder;
  }

  static async create(body: TOrder, accountId: Types.ObjectId) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...order } = body;
    const newOrder = await OrderModel.create({ ...order, accountId });
    return newOrder;
  }

  static async update(id: Types.ObjectId, body: TOrder) {
    const order = await OrderModel.findOneAndUpdate({ _id: id }, { ...body }, { new: true }).lean();
    if (!order) throw new NotFoundError(' not found');
    return order;
  }

  static async delete(id: Types.ObjectId) {
    const order = await OrderModel.findByIdAndRemove(id);
    if (!order) throw new NotFoundError(' not found');
    return { id: order._id };
  }
}
