import mongoose, { Schema } from 'mongoose';

const cartSchema = new Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true,
      },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
export const Cart = mongoose.model('cart', cartSchema);
