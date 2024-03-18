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
  checkProfileDetailsPayload,
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

// auth endpoints
app.post('/api/register', register);

app.post('/api/login', checkAuthPayload, login);

// link endpoints
app.get('/api/links/:userId', authenticateToken, getUserLinks);

app.post(
  '/api/links/:userId',
  authenticateToken,
  checkLinkPayload,
  editUserLinks
);

// user endpoints
app.get('/api/user/:userId', authenticateToken, getUser);

app.put(
  '/api/user/:userId',
  authenticateToken,
  checkProfileDetailsPayload,
  upload.single('image'),
  editUserById
);

app.listen(PORT, startServer);
