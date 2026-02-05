import { Cart } from '../model/cart.js';
import { Product } from '../model/product.js';

// add item to the cart
export const addItems = async ({ userId, productId, quantity }) => {
  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('product not found');
    error.statusCode = 404;
    throw error;
  }
  if (product.stock < quantity) {
    const error = new Error('no enogh stock');
    error.statusCode = 400;
    throw error;
  }
  const cart = await Cart.findOne({ userId: userId });
  if (!cart) {
    const addedProduct = new Cart({
      userId: userId,
      items: {
        productId: productId,
        name: product.name,
        price: product.price,
        quantity: quantity,
        imageUrl: product.imageUrl,
      },
    });
    return await addedProduct.save();
  }
  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId,
  );
  if (existingItem) {
    existingItem.quantity = quantity;
  } else {
    const item = {
      productId: productId,
      name: product.name,
      price: product.price,
      quantity: quantity,
      imageUrl: product.imageUrl,
    };
    cart.items.push(item);
  }
  return await cart.save();
};

// view cart
export const viewCart = async () => {
  return await Cart.find();
};

// update cart
export const updateCart = async ({ productId, quantity }) => {
  const product = await Cart.findOne({ 'items.productId': productId });
  if (!product) {
    const error = new Error('product not found');
    error.statusCode = 404;
    throw error;
  }
  const findProduct = await Product.findById(productId);
  if (findProduct.stock < quantity) {
    const error = new Error('no enogh stock');
    error.statusCode = 400;
    throw error;
  }
  const updatedCart = await Cart.findOneAndUpdate(
    {
      'items.productId': productId,
    },
    { $set: { 'items.$.quantity': quantity } },
    { new: true },
  );
  return updatedCart;
};

// delete item from cart
export const deleteCart = async (productId, userId) => {
  const deletedItem = await Cart.findOneAndUpdate(
    { userId: userId },
    { $pull: { items: { productId: productId } } },
    { new: true },
  );
  return deletedItem;
};
