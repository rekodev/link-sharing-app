import { AccessToken } from "../types/auth";

export const getAuthToken = (): string | null =>
  localStorage.getItem("accessToken");

export const setAuthToken = (authToken: string) =>
  localStorage.setItem("accessToken", authToken);

export const decodeAuthToken = (accessToken: string | null): AccessToken =>
  accessToken ? JSON.parse(atob(accessToken.split(".")[1])) : null;
