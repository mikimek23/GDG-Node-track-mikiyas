import { Cart } from '../model/cart.js';
import { Order } from '../model/order.js';
import { Product } from '../model/product.js';

// create an order
export const createOrder = async (
  userId,
  { customerName, customerEmail, shippingAddress },
) => {
  const cart = await Cart.findOne({ userId });

  if (!cart || cart.items.length === 0) {
    const error = new Error('No items in the cart');
    error.statusCode = 404;
    throw error;
  }

  let totalAmount = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const product = await Product.findById(item.productId);

    if (!product) {
      const error = new Error(`Product ${item.name} no longer exists`);
      error.statusCode = 404;
      throw error;
    }

    if (product.stock < item.quantity) {
      const error = new Error(
        `Not enough stock for ${product.name}. Only ${product.stock} left.`,
      );
      error.statusCode = 400;
      throw error;
    }

    totalAmount += item.price * item.quantity;

    orderItems.push({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    });

    product.stock -= item.quantity;
    await product.save();
  }

  const newOrder = new Order({
    customerName,
    customerEmail,
    shippingAddress,
    items: orderItems,
    total: totalAmount,
  });

  const savedOrder = await newOrder.save();

  // clear cart AFTER successful order
  await Cart.findOneAndDelete({ userId });

  return savedOrder;
};

// get an orders
export const viewOrders = async () => {
  return await Order.find();
};

//get a single order
export const orderById = async (orderId) => {
  const order = await Order.findById(orderId);
  return order;
};
