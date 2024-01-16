import bcrypt from 'bcryptjs';

import { pool } from '../database/db';
import { UserData } from '../types/user';

export const doesUserExist = async (email: string) => {
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    return result.rows.length > 0;
  } catch (error) {
    console.error('Error checking if user exists', error);
  } finally {
    client.release();
  }
};

export const createUser = async (userData: UserData) => {
  const client = await pool.connect();

  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const result = await client.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
      [userData.email, hashedPassword]
    );

    return result.rows[0].id;
  } catch (error) {
    console.error('Error creating user', error);
  } finally {
    client.release();
  }
};
