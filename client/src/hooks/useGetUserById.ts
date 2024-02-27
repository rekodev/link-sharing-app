import useSWR from "swr";
import fetcher, { SWRKeys } from "../api/swr";
import { useMemo } from "react";
import { UserModel } from "../types/user";
import decodeAccessToken from "../utils/decodeAccessToken";

const useGetUserById = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = decodeAccessToken(accessToken)?.userId;

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
