import cors from 'cors';
import express, { Request, Response } from 'express';

import ProductRoutes from './routes/ProductRoutes';
import OrderRoutes from './routes/OrderRoutes';

const app = express();
app.use(express.json());

//application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred.',
    error: err.message,
  });
});
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found',
  });
});
app.use(cors());




app.get('/', (req: Request, res: Response) => {
  res.send('Book app is Running!');
});

export default app;
