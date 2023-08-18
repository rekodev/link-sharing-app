export interface IShareableLinkValues {
  id: string;
  platform: string;
  link: string;
  attemptedSave: boolean;
  errors: {
    platform: boolean;
    link: boolean;
  };
  isBeingDragged: boolean | undefined;
}
