export interface RequestAuthModel {
  email?: string;
  password?: string;
  confirmPassword?: string;
  defaultOrganizationId?: number;
  organizationId?: number;
  resetToken?: string;
}
