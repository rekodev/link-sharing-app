export type ProfileDetails = {
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string;
};

export type ProfileDetailsError = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
};

export type SnackbarType = 'success' | 'error' | 'info' | 'warning';
