import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const fetcher = (url: string) =>
  axios.get(url, { baseURL }).then((res) => res.data);

export default fetcher;

export const SWRKeys = {
  user: (email: string) => `/api/user/${email}`,
};
