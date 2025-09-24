export interface PasswordModel {
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const PasswordModelDefaultModel: PasswordModel = {
  password: undefined,
  newPassword: undefined,
  confirmPassword: undefined,
};
