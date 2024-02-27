import { useContext, useMemo } from 'react';
import useSWR from 'swr';

import fetcher, { SWRKeys } from '../api/swr';
import { AuthContext } from '../contexts/authContext';
import { UserModel } from '../types/user';
import { decodeAuthToken } from '../utils/authToken';

const useGetUserById = () => {
  const { authToken } = useContext(AuthContext);
  const userId = decodeAuthToken(authToken)?.userId;

  const { data, isLoading, mutate, error, isValidating } = useSWR(
    SWRKeys.user(userId),
    fetcher
  );

  return useMemo(
    () => ({
      data: data as UserModel,
      isLoading,
      mutate,
      error,
      isValidating,
    }),
    [data, isLoading, mutate, error, isValidating]
  );
};

export default useGetUserById;
