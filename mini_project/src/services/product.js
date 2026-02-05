import { Product } from '../model/product.js';

//create product
export const createProducts = async ({
  name,
  description,
  price,
  stock,
  category,
  imageUrl,
}) => {
  const product = new Product({
    name,
    description,
    price,
    stock,
    category,
    imageUrl,
  });
  return await product.save();
};

// get all products and filter products by  category and price
export const filterProduct = async (options) => {
  const { category, minPrice, maxPrice } = options;
  let query = {};
  if (category) query.category = category;
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) query.price.$gte = minPrice;
    if (maxPrice !== undefined) query.price.$lte = maxPrice;
  }
  return await Product.find(query);
};

// get product by Id
export const getProductById = async (productId) => {
  return await Product.findById(productId);
};

// update product
export const updateProduct = async (productId, data) => {
  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('product not found');
    error.statusCode = 404;
    throw error;
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: productId },
    { $set: { ...data } },
    { new: true },
  );
  return updatedProduct;
};

//delete product
export const deleteProduct = async (productId) => {
  const deletedProduct = await Product.deleteOne({ _id: productId });
  return deletedProduct;
};
