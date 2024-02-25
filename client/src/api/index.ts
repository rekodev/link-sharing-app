import { AxiosResponse } from 'axios';
import { LoginResp } from '../types/response';
import api from './apiInstance';

export const createUser = async (email: string, password: string) =>
  await api.post('/api/register', {
    email,
    password,
  });

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<LoginResp>> =>
  await api.post('/api/login', {
    email,
    password,
  });
