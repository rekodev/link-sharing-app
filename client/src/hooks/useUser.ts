import { useContext, useMemo } from "react";
import useSWRImmutable from "swr/immutable";

import fetcher, { SWRKeys } from "../api/swr";
import { AuthContext } from "../contexts/authContext";
import { UserModel } from "../types/user";
import { decodeAuthToken } from "../utils/authToken";

const useUser = (revalidateOnMount: boolean = false) => {
  const { authToken } = useContext(AuthContext);
  const userId = decodeAuthToken(authToken)?.userId;

  const { data, isLoading, mutate, error, isValidating } =
    useSWRImmutable<UserModel>(SWRKeys.user(userId), fetcher, {
      revalidateOnMount,
    });

  return useMemo(
    () => ({
      user: data,
      isUserLoading: isLoading,
      mutateUser: mutate,
      userError: error,
      userIsValidating: isValidating,
    }),
    [data, isLoading, mutate, error, isValidating]
  );
};

export default useUser;
