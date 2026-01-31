import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import raidRoutes from './routes/raidRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(raidRoutes);

export { app };
