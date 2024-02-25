const { Pool } = require('pg');
require('dotenv').config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
  },
});

export async function getPostgresVersion() {
  const client = await pool.connect();
  try {
    const response = await client.query('SELECT version()');
    console.log(response.rows[0]);
  } finally {
    client.release();
  }
}

export const connectToDb = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to database successfully');
    const res = await client.query('SELECT NOW()');
    console.log('Current time from the database:', res.rows[0].now);

    client.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};
