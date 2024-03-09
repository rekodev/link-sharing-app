import { useContext, useMemo } from 'react';
import useSWR from 'swr';

import fetcher, { SWRKeys } from '../api/swr';
import { AuthContext } from '../contexts/authContext';
import { GetLinksResp } from '../types/response';
import { decodeAuthToken } from '../utils/authToken';

const useUserLinks = () => {
  const { authToken } = useContext(AuthContext);
  const userId = decodeAuthToken(authToken)?.userId;

  const { data, isLoading, mutate, error, isValidating } = useSWR<GetLinksResp>(
    SWRKeys.userLinks(userId),
    fetcher
  );

  return useMemo(
    () => ({
      links: data?.links.sort((a, b) => a.index - b.index),
      isLinksLoading: isLoading,
      mutateLinks: mutate,
      linksError: error,
      linksIsValidating: isValidating,
    }),
    [data, isLoading, mutate, error, isValidating]
  );
};

export default useUserLinks;
