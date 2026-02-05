import express from 'express';
import { getOrderById, getOrders, placeOrder } from '../controllers/order.js';

const orderRouter = express.Router();
orderRouter.post('/', placeOrder);
orderRouter.get('/', getOrders);
orderRouter.get('/:id', getOrderById);
export default orderRouter;
