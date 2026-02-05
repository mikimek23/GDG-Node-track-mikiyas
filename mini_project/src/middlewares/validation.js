import Joi from 'joi';

export const productValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().required(),
  price: Joi.number().greater(0).required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().required(),
  imageUrl: Joi.string().uri().optional(),
});

export const cartValidation = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string()
    .pattern(new RegExp(/^[0-9a-fA-F]{24}$/))
    .required()
    .messages({ 'string.pattern.base': 'In valid id format!' }),
  quantity: Joi.number().integer().min(1).default(1),
});
export const orderValidation = Joi.object({
  userId: Joi.string().required(),
  customerName: Joi.string().min(3).max(30).required(),
  customerEmail: Joi.string().email().required(),
  shippingAddress: Joi.string().required(),
});
export const idValidation = Joi.object({
  id: Joi.string()
    .pattern(new RegExp(/^[0-9a-fA-F]{24}$/))
    .required()
    .messages({ 'string.pattern.base': 'In valid id format!' }),
});
