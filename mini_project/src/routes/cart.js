import express from 'express';
import {
  createCart,
  deleteItem,
  getCart,
  updateItem,
} from '../controllers/cart.js';

const cartRouter = express.Router();

cartRouter.post('/', createCart);
cartRouter.get('/', getCart);
cartRouter.put('/', updateItem);
cartRouter.delete('/:id', deleteItem);
export default cartRouter;
