export interface RequestAuthModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: number;
  defaultOrganizationId?: number;
  organizationId?: number;
  resetToken?: string;
  verifyPhoneNumber?: number;
  verifyCode?: number;
}
