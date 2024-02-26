import { AxiosResponse } from "axios";
import { LoginResp, UpdateProfileResp } from "../types/response";
import api from "./apiInstance";

export const createUser = async (email: string, password: string) =>
  await api.post("/api/register", {
    email,
    password,
  });

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<LoginResp>> =>
  await api.post("/api/login", {
    email,
    password,
  });

export const updateProfile = async (
  id: number,
  firstName: string,
  lastName: string,
  email: string
): Promise<AxiosResponse<UpdateProfileResp>> =>
  await api.put(`/api/user/${id}`, { firstName, lastName, email });
