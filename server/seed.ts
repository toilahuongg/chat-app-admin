// import axios from 'axios';
// import ProductModel from './models/product.model';
import { faker } from '@faker-js/faker';
import AccountModel from './models/account.model';
import ProductModel from './models/product.model';
import OrderModel from './models/order.model';

import('@server/dbs/init.mongodb');

function generateRandomProductCount() {
  return Math.floor(Math.random() * 5) + 1;
}

// Hàm tạo ngẫu nhiên một đơn hàng
async function generateRandomOrder() {
  try {
    // Lấy ngẫu nhiên một tài khoản từ danh sách tài khoản
    const account = await AccountModel.findOne().skip(
      Math.floor(Math.random() * (await AccountModel.countDocuments())),
    );

    // Tạo một mảng để lưu trữ sản phẩm trong đơn hàng
    const products = [];

    // Lấy số lượng sản phẩm ngẫu nhiên cho đơn hàng
    const productCount = generateRandomProductCount();

    // Lặp để lấy ngẫu nhiên các sản phẩm từ danh sách sản phẩm
    for (let i = 0; i < productCount; i++) {
      const product = await ProductModel.findOne().skip(
        Math.floor(Math.random() * (await ProductModel.countDocuments())),
      );
      products.push(product);
    }

    // Tính tổng giá trị đơn hàng dựa trên giá của các sản phẩm
    const total = products.reduce((sum, product) => sum + (product?.price || 0), 0);

    // Tạo order với sản phẩm và tài khoản đã chọn ngẫu nhiên
    const order = new OrderModel({
      detail: faker.lorem.sentence(),
      products: products.map((p) => ({ productId: p?._id, price: p?.compareAtPrice, quantity: 1 })),
      total: total,
      accountId: account?._id,
    });

    // Lưu order vào cơ sở dữ liệu
    const savedOrder = await order.save();
    console.log('Created order:', savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
  }
}

// Tạo 10 đơn hàng ngẫu nhiên
for (let i = 0; i < 55; i++) {
  generateRandomOrder();
}
