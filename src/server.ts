import 'dotenv/config';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import raidRoutes from './routes/raidRoutes.js';

const app = express();
app.use(express.json());

app.use('/', userRoutes);
app.use('/', raidRoutes);

app.listen(3333, () => console.log('Server Online!'));
