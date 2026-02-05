import express from 'express';
import morgan from 'morgan';
import productRouter from './src/routes/product.js';
import cartRouter from './src/routes/cart.js';
import orderRouter from './src/routes/order.js';
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/orders', orderRouter);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({
    success: false,
    message: message,
  });
});
export default app;
