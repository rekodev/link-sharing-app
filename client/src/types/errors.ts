export interface ILinkCardError {
  select: boolean;
  text: boolean;
  attemptedSave: boolean;
}

export type ProfileDetailsFieldsError = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
};
