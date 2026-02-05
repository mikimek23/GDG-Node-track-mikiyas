import { idValidation, orderValidation } from '../middlewares/validation.js';
import { createOrder, orderById, viewOrders } from '../services/order.js';

// place an order
export const placeOrder = async (req, res, next) => {
  const { error } = orderValidation.validate(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  try {
    const { userId, customerName, customerEmail, shippingAddress } = req.body;
    const order = await createOrder(userId, {
      customerName,
      customerEmail,
      shippingAddress,
    });
    res
      .status(200)
      .json({ message: 'order placed successfully!', orderReceipt: order });
  } catch (error) {
    next(error);
  }
};

// get all orders
export const getOrders = async (req, res, next) => {
  try {
    const orders = await viewOrders();
    if (!orders || orders.length === 0) {
      const error = new Error('No order placed!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

//get order by id
export const getOrderById = async (req, res, next) => {
  const { error } = idValidation.validate(req.params);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  try {
    const orderId = req.params.id;
    const order = await orderById(orderId);
    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
