import express from 'express';
import { connectToDb } from './database/db';
import { editUserById, getUserById } from './controllers/userController';
import { login, register } from './controllers/authController';
import cors from 'cors';
import { checkAuthPayload } from './middleware/payloadValidation';
import authenticateToken from './middleware/auth';

require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

const startServer = () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDb();
};

app.post('/api/register', register);

app.post('/api/login', checkAuthPayload, login);

app.get('/api/user/:userId', authenticateToken, getUserById);

app.put('/api/user/:userId', authenticateToken, editUserById);

app.listen(PORT, startServer);
