import { useContext, useMemo } from 'react';
import useSWR from 'swr';

import fetcher, { SWRKeys } from '../api/swr';
import { AuthContext } from '../contexts/authContext';
import { GetLinksResp } from '../types/response';
import { decodeAuthToken } from '../utils/authToken';

const useUserLinks = (revalidateOnMount: boolean = false) => {
  const { authToken } = useContext(AuthContext);
  const userId = decodeAuthToken(authToken)?.userId;

  const { data, isLoading, mutate, error, isValidating } = useSWR<GetLinksResp>(
    SWRKeys.userLinks(userId),
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnMount: revalidateOnMount,
    }
  );

  return useMemo(
    () => ({
      links: data?.links.sort((a, b) => a.index - b.index) || [],
      isLinksLoading: isLoading,
      mutateLinks: mutate,
      linksError: error,
      linksIsValidating: isValidating,
    }),
    [data, isLoading, mutate, error, isValidating]
  );
};

export default useUserLinks;
