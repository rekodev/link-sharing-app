import express from 'express';
import { register } from '../controllers/userController';

const router = express.Router();

// POST endpoint for user creation
router.post('/api/register', register);

export default router;
