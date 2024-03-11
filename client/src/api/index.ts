import { AxiosResponse } from 'axios';

import api from './apiInstance';
import { UserLink } from '../types/link';
import {
  LoginResp,
  UpdateLinksResp,
  UpdateProfileResp,
} from '../types/response';

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

export const updateProfile = async (
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  image: File | null
): Promise<AxiosResponse<UpdateProfileResp>> => {
  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('email', email);
  if (image) {
    formData.append('image', image);
  }

  return await api.put(`/api/user/${id}`, formData);
};

export const updateLinks = async (
  userId: number,
  links: Array<UserLink>
): Promise<AxiosResponse<UpdateLinksResp>> =>
  await api.post(`/api/links/${userId}`, { links });
