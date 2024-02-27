import axios, { HttpStatusCode } from "axios";
import { eventEmitter } from "../utils/eventEmitter";
import { AUTH_FAILURE } from "../constants/auth";
import { getAuthToken } from "../utils/authToken";

const fetcher = async (url: string) => {
  const response = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    .then((res) => res.data);

  if (
    response.status === HttpStatusCode.Unauthorized ||
    response.status === HttpStatusCode.Forbidden
  ) {
    eventEmitter.emit(AUTH_FAILURE);
    throw new Error("Authentication failure");
  }

  if (!response.ok) {
    throw new Error("Network response was not okay");
  }

  return response.json();
};

export default fetcher;

export const SWRKeys = {
  user: (userId: number) => `/api/user/${userId}`,
};
