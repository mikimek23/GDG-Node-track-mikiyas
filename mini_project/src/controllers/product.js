import { productValidation } from '../middlewares/validation.js';
import {
  createProducts,
  deleteProduct,
  filterProduct,
  getProductById,
  updateProduct,
} from '../services/product.js';

// create product
export const postProduct = async (req, res) => {
  const { error } = productValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const product = await createProducts(req.body);
    res.status(201).json({
      message: 'product created successfully!',
      preview: product,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'something want wrong! ',
      success: false,
    });
  }
};
//get products all product and fileter a product by category and price
export const getProduct = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    const filters = {
      category,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    };
    const products = await filterProduct(filters);
    if (products.length === 0) {
      return res.status(404).json({ message: 'Items not found' });
    }
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error while fetching products', error: error.message });
  }
};
//get product by Id
export const productById = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const product = await getProductById(productId);
    if (!product) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error while fetching products', error: error.message });
  }
};
//update proudct
export const updateProducts = async (req, res) => {
  const { error } = productValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const data = req.body;
    const productId = req.params.id;
    const updatedProduct = await updateProduct(productId, data);
    res
      .status(201)
      .json({ message: 'updated successfully!', preview: updatedProduct });
  } catch (err) {
    if (err.message === 'product not found') {
      return res.status(404).json({ message: err.message });
    }
    res
      .status(500)
      .json({ message: 'something want wrong!', error: err.message });
  }
};
// delete product
export const deleteProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await deleteProduct(productId);
    if (deletedProduct.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found!' });
    }
    res
      .status(200)
      .json({ message: 'Product deleted successfully!', Id: productId });
  } catch (error) {
    res
      .status(500)
      .status(500)
      .json({ message: 'something want wrong!', error: error.message });
  }
};
