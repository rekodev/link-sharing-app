import { useContext, useMemo } from 'react';
import useSWR from 'swr';

import fetcher, { SWRKeys } from '../api/swr';
import { AuthContext } from '../contexts/authContext';
import { UserModel } from '../types/user';
import { decodeAuthToken } from '../utils/authToken';

const useUser = () => {
  const { authToken } = useContext(AuthContext);
  const userId = decodeAuthToken(authToken)?.userId;

  const { data, isLoading, mutate, error, isValidating } = useSWR(
    SWRKeys.user(userId),
    fetcher
  );

  return useMemo(
    () => ({
      user: data as UserModel,
      isUserLoading: isLoading,
      mutateUser: mutate,
      userError: error,
      userIsValidating: isValidating,
    }),
    [data, isLoading, mutate, error, isValidating]
  );
};

export default useUser;
