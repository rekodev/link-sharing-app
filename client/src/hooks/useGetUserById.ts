import useSWR from "swr";
import fetcher, { SWRKeys } from "../api/swr";
import { useMemo } from "react";
import { UserModel } from "../types/user";
import { getAuthToken, decodeAuthToken } from "../utils/authToken";

const useGetUserById = () => {
  const authToken = getAuthToken();
  const userId = decodeAuthToken(authToken)?.userId;

  const { data, isLoading, mutate, error, isValidating } = useSWR(
    SWRKeys.user(userId),
    fetcher,
  );

  return useMemo(
    () => ({
      data: data as UserModel,
      isLoading,
      mutate,
      error,
      isValidating,
    }),
    [data, isLoading, mutate, error, isValidating],
  );
};

export default useGetUserById;
