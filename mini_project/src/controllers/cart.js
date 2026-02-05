import { cartValidation, idValidation } from '../middlewares/validation.js';
import {
  addItems,
  deleteCart,
  updateCart,
  viewCart,
} from '../services/cart.js';

// add to cart
export const createCart = async (req, res, next) => {
  const { error } = cartValidation.validate(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  try {
    const product = await addItems(req.body);
    return res
      .status(201)
      .json({ message: 'item added successfully', preview: product });
  } catch (error) {
    next(error);
  }
};

// list cart
export const getCart = async (req, res, next) => {
  try {
    const cart = await viewCart();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

//update cart
export const updateItem = async (req, res, next) => {
  const { error } = cartValidation.validate(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  try {
    const cart = await updateCart(req.body);
    res.status(200).json({ message: 'cart updated', preview: cart });
  } catch (error) {
    next(error);
  }
};

//delete item from cart
export const deleteItem = async (req, res, next) => {
  const { error } = idValidation.validate(req.params);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  try {
    const productId = req.params.id;
    const userId = 'user123';
    const item = await deleteCart(productId, userId);
    if (!item) {
      const error = new Error('Item not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'item deleted', id: productId });
  } catch (error) {
    next(error);
  }
};
