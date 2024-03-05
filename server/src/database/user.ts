import bcrypt from 'bcryptjs';

import { pool } from '../database/db';
import { UserCredentials, UserDto, UserProfileInfo } from '../types/types';

export const doesUserExist = async (email: string) => {
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    return result.rows.length > 0;
  } catch (error) {
    console.error('Error checking if user exists', error);
    throw error;
  } finally {
    client.release();
  }
};

export const findUserById = async (id: string): Promise<UserDto | null> => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT id, email, first_name, last_name, created_at, updated_at, profile_picture_url FROM users WHERE id = $1',
      [id]
    );

    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Error checking if user exists', error);
    throw error;
  } finally {
    client.release();
  }
};

export const findUserByEmail = async (
  email: string
): Promise<UserDto | null> => {
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Error checking if user exists', error);
    throw error;
  } finally {
    client.release();
  }
};

export const createUser = async (userCredentials: UserCredentials) => {
  const { email, password } = userCredentials;

  const client = await pool.connect();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
      [email, hashedPassword]
    );

    return result.rows[0].id;
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  } finally {
    client.release();
  }
};

export const isPasswordCorrect = async (userCredentials: UserCredentials) => {
  const { email, password: submittedPassword } = userCredentials;

  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT password FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length > 0) {
      return await bcrypt.compare(submittedPassword, result.rows[0].password);
    }

    return false;
  } catch (error) {
    console.error('Error checking password', error);
    throw error;
  } finally {
    client.release();
  }
};

export const editUserInformation = async (
  id: string,
  userProfileInfo: UserProfileInfo
) => {
  const { email, firstName, lastName, profilePictureUrl } = userProfileInfo;
  const client = await pool.connect();

  try {
    const result = await client.query(
      'UPDATE users SET first_name = $1, last_name = $2, email = $3, profile_picture_url = $4 WHERE id = $5',
      [firstName, lastName, email, profilePictureUrl, id]
    );

    if (result.rowCount > 0) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error updating user information', error);
    throw error;
  }
};
