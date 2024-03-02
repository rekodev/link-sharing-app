export type ProfilePicture = {
  id: string;
  name: string;
};

export interface IProfileDetails {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: ProfilePicture;
}

export type SnackbarType = 'success' | 'error' | 'info' | 'warning';
