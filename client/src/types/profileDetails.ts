export type ProfilePicture = {
  id: string;
  name: string;
};

export type ProfileDetails = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: ProfilePicture;
};

export type SnackbarType = 'success' | 'error' | 'info' | 'warning';
