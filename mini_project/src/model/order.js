import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true, lowercase: true },
  shippingAddress: { type: String, required: true },
  total: { type: Number, required: true },
  items: [
    {
      productId: { type: String, ref: 'product', required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  date: { type: Date, default: Date.now },
});
export const Order = mongoose.model('order', orderSchema);
