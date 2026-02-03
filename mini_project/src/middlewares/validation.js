import Joi from 'joi';

export const productValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().required(),
  price: Joi.number().greater(0).required(),
  stock: Joi.number().min(0).required(),
  category: Joi.string().required(),
  imageUrl: Joi.string().uri().optional(),
});
