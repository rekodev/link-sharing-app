import axios from "axios";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

import useAuth from "../../../hooks/useAuth";
import { getAuthToken } from "../../../utils/authToken";

type Props = {
  children: ReactNode;
};

const baseURL = import.meta.env.VITE_API_BASE_URL;
const authToken = getAuthToken();

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response.data;
};

const SWRConfigProvider = ({ children }: Props) => {
  const { handleAuthError } = useAuth();

  return (
    <SWRConfig value={{ fetcher, onError: handleAuthError }}>
      {children}
    </SWRConfig>
  );
};

export default SWRConfigProvider;
