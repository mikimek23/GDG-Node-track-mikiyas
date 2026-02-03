import express from 'express';
import morgan from 'morgan';
import productRouter from './src/routes/product.js';
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/products', productRouter);

export default app;
