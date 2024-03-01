import { Logout } from '@mui/icons-material';

import { StyledLogoutButton } from './style';
import useAuth from '../../hooks/useAuth';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <StyledLogoutButton onClick={logout}>
      <Logout fontSize={'small'} />
    </StyledLogoutButton>
  );
};

export default LogoutButton;
