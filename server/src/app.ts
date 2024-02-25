import express from 'express';
import { connectToDb } from './database/db';
import { login, register } from './controllers/userController';
import cors from 'cors';

require('dotenv').config();

export const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// Starting server
const startServer = () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDb();
};

app.post('/api/register', register);

app.post('/api/login', login);

app.listen(PORT, startServer);
