import { PhoneCodeModel } from "@/const/models/PhoneCodeModel.ts";

export interface RequestAuthModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: any;
  defaultOrganizationId?: number;
  organizationId?: number;
  resetToken?: string;
  verifyPhoneNumber?: number;
  verifyCode?: number;
  phoneCodeModel: PhoneCodeModel;
}
