import { idValidation, productValidation } from '../middlewares/validation.js';
import {
  createProducts,
  deleteProduct,
  filterProduct,
  getProductById,
  updateProduct,
} from '../services/product.js';

// create product
export const postProduct = async (req, res, next) => {
  const { error } = productValidation.validate(req.body);

  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  try {
    const product = await createProducts(req.body);
    res.status(201).json({
      message: 'product created successfully!',
      preview: product,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
//get products all product and fileter a product by category and price
export const getProduct = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    const filters = {
      category,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    };
    const products = await filterProduct(filters);
    if (products.length === 0) {
      const error = new Error('Items not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
//get product by Id
export const productById = async (req, res, next) => {
  const { error } = idValidation.validate(req.params);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  try {
    const productId = req.params.id;
    console.log(productId);
    const product = await getProductById(productId);
    if (!product) {
      const error = new Error('Item not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
//update proudct
export const updateProducts = async (req, res, next) => {
  const { error: bodyError } = productValidation.validate(req.body);
  if (bodyError) {
    const err = new Error(bodyError.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  const { error: paramsError } = idValidation.validate(req.params);
  if (paramsError) {
    const err = new Error(paramsError.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  try {
    const data = req.body;
    const productId = req.params.id;
    const updatedProduct = await updateProduct(productId, data);
    res
      .status(201)
      .json({ message: 'updated successfully!', preview: updatedProduct });
  } catch (error) {
    next(error);
  }
};
// delete product
export const deleteProducts = async (req, res, next) => {
  const { error } = idValidation.validate(req.params);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    throw err;
  }
  try {
    const productId = req.params.id;
    const deletedProduct = await deleteProduct(productId);
    if (deletedProduct.deletedCount === 0) {
      const error = new Error('Product not found!');
      error.statusCode = 404;
      throw error;
    }
    res
      .status(200)
      .json({ message: 'Product deleted successfully!', Id: productId });
  } catch (error) {
    next(error);
  }
};
