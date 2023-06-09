import { getTopCustomers, getTopProducts } from '@server/models/repositories/order.repo';

export default class AdminService {
  static async getTopCustomers() {
    return getTopCustomers();
  }

  static async getTopProducts() {
    return getTopProducts();
  }
}
