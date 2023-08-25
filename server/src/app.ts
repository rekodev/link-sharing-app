import express, { Express } from 'express';
import cors from 'cors';
import dbConnection from '../config/db';

const app: Express = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Starting server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// Database
dbConnection();

// Routes
