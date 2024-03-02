import { useContext, useEffect, useMemo } from 'react';
import useSWR from 'swr';

import fetcher, { SWRKeys } from '../api/swr';
import { AuthContext } from '../contexts/authContext';
import { ProfileDetailsContext } from '../contexts/profileDetailsContext';
import { ProfileDetails } from '../types/profileDetails';
import { UserModel } from '../types/user';
import { decodeAuthToken } from '../utils/authToken';

const transformUserData = (userData: UserModel): ProfileDetails => {
  return {
    firstName: userData.firstName,
    email: userData.email,
    lastName: userData.lastName,
    profilePicture: {
      id: userData.profilePictureUrl,
      name: '',
    },
  };
};

const useUser = () => {
  const { authToken } = useContext(AuthContext);
  const userId = decodeAuthToken(authToken)?.userId;
  const { setProfileDetails } = useContext(ProfileDetailsContext);

  const { data, isLoading, mutate, error, isValidating } = useSWR<UserModel>(
    SWRKeys.user(userId),
    fetcher
  );

  useEffect(() => {
    if (!data) return;

    setProfileDetails(transformUserData(data));
  }, [data, setProfileDetails]);

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
