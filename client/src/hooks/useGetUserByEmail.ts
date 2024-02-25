import useSWR from 'swr';
import fetcher, { SWRKeys } from '../api/swr';
import { useMemo } from 'react';

const useGetUserByEmail = (email: string) => {
  const { data, isLoading, mutate, error, isValidating } = useSWR(
    SWRKeys.user(email),
    fetcher
  );

  return useMemo(
    () => ({
      data,
      isLoading,
      mutate,
      error,
      isValidating,
    }),
    [data, isLoading, mutate, error, isValidating]
  );
};

export default useGetUserByEmail;
