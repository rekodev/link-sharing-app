import express from 'express';
import cors from 'cors';
require('dotenv').config();
import multer from 'multer';
import './config/cloudinary';
import { connectToDb } from './database/db';
import { editUserById, getUserById } from './controllers/userController';
import { login, register } from './controllers/authController';
import { checkAuthPayload } from './middleware/payloadValidation';
import authenticateToken from './middleware/auth';

const PORT = process.env.PORT;
const app = express();
const upload = multer();

app.use(express.json());
app.use(cors());

const startServer = () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDb();
};

app.post('/api/register', register);

app.post('/api/login', checkAuthPayload, login);

app.get('/api/user/:userId', authenticateToken, getUserById);

app.put(
  '/api/user/:userId',
  authenticateToken,
  upload.single('image'),
  editUserById
);

app.listen(PORT, startServer);
