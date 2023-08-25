export interface IProfileDetails {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: {
    src: string;
    name: string;
  };
}

export type SnackbarType = 'success' | 'error' | 'info' | 'warning';
