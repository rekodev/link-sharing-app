import express from 'express';
import { register } from '../controllers/authController';

const router = express.Router();

// POST endpoint for user creation
router.post('/api/register', register);

export default router;
