import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true, lowercase: true },
  shippingAddress: { type: String, required: true },
  items: [
    {
      productId: { type: String, ref: 'cart', required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      _id: false,
    },
  ],
  total: { type: Number, required: true },
  deliveryDate: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      return date;
    },
  },
});
export const Order = mongoose.model('order', orderSchema);
