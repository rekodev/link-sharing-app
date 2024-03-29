import { useContext, useMemo } from "react";
import useSWRImmutable from "swr/immutable";

import SWRKeys from "../constants/swrKeys";
import { AuthContext } from "../contexts/authContext";
import { GetLinksResp } from "../types/response";
import { decodeAuthToken } from "../utils/authToken";

const useUserLinks = (revalidateOnMount: boolean = false) => {
  const { authToken } = useContext(AuthContext);
  const userId = decodeAuthToken(authToken)?.userId;

  const { data, isLoading, mutate, error, isValidating } =
    useSWRImmutable<GetLinksResp>(SWRKeys.userLinks(userId), {
      revalidateOnMount,
    });

  return useMemo(
    () => ({
      links: data?.links,
      isLinksLoading: isLoading,
      mutateLinks: mutate,
      linksError: error,
      linksIsValidating: isValidating,
    }),
    [data, isLoading, mutate, error, isValidating]
  );
};

export default useUserLinks;
