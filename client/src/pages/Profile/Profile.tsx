import { CircularProgress } from '@mui/material';

import LinksPreview from '../../components/LinksPreview';
import ProfileDetailsForm from '../../components/ProfileDetailsForm';
import useUser from '../../hooks/useUser';

const Profile = () => {
  const { user, isUserLoading } = useUser();

  if (isUserLoading)
    return <CircularProgress color='primary' sx={{ margin: 'auto' }} />;

  return (
    <>
      <LinksPreview user={user} />
      <ProfileDetailsForm />
    </>
  );
};

export default Profile;
