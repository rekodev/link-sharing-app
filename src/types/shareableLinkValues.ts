export interface IShareableLinkValues {
  id: string;
  platform: string;
  link: string;
  errors: {
    platform: boolean;
    link: boolean;
  };
}
