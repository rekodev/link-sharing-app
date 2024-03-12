import axios from "axios";

import { getAuthToken } from "../utils/authToken";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  return response.data;
};

export default fetcher;

export const SWRKeys = {
  user: (userId: number) => `/api/user/${userId}`,
  userLinks: (userId: number) => `api/links/${userId}`,
};

export const SWRConfig = {};
