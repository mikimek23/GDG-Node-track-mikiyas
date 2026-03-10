import Joi from "joi";

export const userValidator = Joi.object({
    full_name: Joi.string().min(3).required().messages({"string.min":"Full name must be min 3 character long.", "any.required":"full name is required"}),
    email: Joi.string().email().required().messages({"string.email":"Incorrect email format", "any.required":"Email is required."}),
    password: Joi.string().min(8).required().messages({"string.min":"Password must be min 8 character long.", "any.required":"Passoerd is required"})
})
export const logInvalidator = Joi.object({
    email: Joi.string().email().required().messages({"string.email":"Incorrect email format", "any.required":"Email is required."}),
    password: Joi.string().min(8).required().messages({"string.min":"Password must be min 8 character long.", "any.required":"Passoerd is required"})
})