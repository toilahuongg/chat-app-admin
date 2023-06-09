import AccountModel from '../account.model';
import OrderModel from '../order.model';
import ProductModel from '../product.model';

export async function getTopCustomers() {
  try {
    const result = await OrderModel.aggregate([
      {
        $group: {
          _id: '$accountId',
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { totalOrders: -1 },
      },
      {
        $limit: 5, // Lấy 5 khách hàng mua nhiều nhất
      },
    ]);

    // Lấy thông tin chi tiết về khách hàng từ danh sách id tài khoản
    const customerIds = result.map((item) => item._id);
    const customers = await AccountModel.find({ _id: { $in: customerIds } }).lean();

    return result.map((item) => {
      const customer = customers.find((c) => c._id.equals(item._id));
      return {
        ...customer,
        ...item,
      };
    });
  } catch (error) {
    console.error('Error getting top customers:', error);
  }
}

// Thống kê sản phẩm mua nhiều nhất
export async function getTopProducts() {
  try {
    const result = await OrderModel.aggregate([
      {
        $unwind: '$products',
      },
      {
        $group: {
          _id: '$products.productId',
          totalQuantity: { $sum: 1 },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 5, // Lấy 5 sản phẩm mua nhiều nhất
      },
    ]);

    // Lấy thông tin chi tiết về sản phẩm từ danh sách id sản phẩm
    const productIds = result.map((item) => item._id);
    const products = await ProductModel.find({ _id: { $in: productIds } }).lean();

    return result.map((item) => {
      const product = products.find((c) => c._id.equals(item._id));
      return {
        ...product,
        ...item,
      };
    });
  } catch (error) {
    console.error('Error getting top products:', error);
  }
}
