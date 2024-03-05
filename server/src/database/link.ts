import { LinkDto } from '../types/types';
import { pool } from './db';

export const insertLinks = async (
  userId: number,
  platform: string,
  linkUrl: string
) => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'INSERT INTO links (user_id, platform, link_url) VALUES ($1, $2, $3) RETURNING id',
      [userId, platform, linkUrl]
    );

    return result.rows.length > 0;
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  } finally {
    client.release();
  }
};

export const getLinks = async (
  userId: number
): Promise<Array<LinkDto> | null> => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT * FROM links WHERE user_id = $1',
      [userId]
    );

    return result.rows;
  } catch (error) {
    console.error('Error retrieving user links');
    throw error;
  } finally {
    client.release();
  }
};
