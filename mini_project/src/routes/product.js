import express from 'express';
import {
  deleteProducts,
  getProduct,
  postProduct,
  productById,
  updateProducts,
} from '../controllers/product.js';

const productRouter = express.Router();

productRouter.post('/', postProduct);
productRouter.get('/', getProduct);
productRouter.get('/:id', productById);
productRouter.put('/:id', updateProducts);
productRouter.delete('/:id', deleteProducts);

export default productRouter;
