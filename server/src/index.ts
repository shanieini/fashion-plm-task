import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import garmentRoutes from './routes/garment.routes';

const app = express();

export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Fashion PLM System is running' });
});

app.use('/api/garments', garmentRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});