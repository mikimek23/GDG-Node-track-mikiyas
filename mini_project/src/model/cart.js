import mongoose, { Schema } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, min: 0, required: true },
        quantity: { type: Number, required: true, min: 1, default: 1 },
        imageUrl: {
          type: String,
          required: false,
        },
        _id: false,
      },
    ],
  },
  { timestamps: true },
);
export const Cart = mongoose.model('cart', cartSchema);
