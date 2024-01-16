import express from 'express';
import { connectToDb, getPostgresVersion } from './database/db';

require('dotenv').config();

export const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Starting server
const startServer = () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDb();
};

app.listen(PORT, startServer());
