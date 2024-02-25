import api from './apiInstance';

export const createUser = async (email: string, password: string) =>
  await api.post('/api/register', {
    email,
    password,
  });
