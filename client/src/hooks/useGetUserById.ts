import useSWR from 'swr';
import fetcher, { SWRKeys } from '../api/swr';
import { useMemo } from 'react';

const useGetUserById = (id: number) => {
  const { data, isLoading, mutate, error, isValidating } = useSWR(
    SWRKeys.user(id),
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

export default useGetUserById;
