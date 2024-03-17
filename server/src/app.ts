import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import './config/cloudinary';
import { connectToDb } from './database/db';
import { editUserById, getUser } from './controllers/userController';
import { login, register } from './controllers/authController';
import {
  checkAuthPayload,
  checkLinkPayload,
} from './middleware/payloadValidation';
import authenticateToken from './middleware/auth';
import { editUserLinks, getUserLinks } from './controllers/linkController';

dotenv.config();

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

app.post('/api/links/:userId', checkLinkPayload, editUserLinks);

app.get('/api/links/:userId', getUserLinks);

app.get('/api/user/:userId', authenticateToken, getUser);

app.put(
  '/api/user/:userId',
  authenticateToken,
  upload.single('image'),
  editUserById
);

app.listen(PORT, startServer);
