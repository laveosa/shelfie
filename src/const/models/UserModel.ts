import { IDateRange } from "@/const/interfaces/IDateRange.ts";
import { UserOrganizationModel } from "@/const/models/UserOrganizationModel.ts";

export interface UserModel {
  id?: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  age?: number;
  email?: string;
  phone?: string;
  address?: string;
  workStatus?:
    | "active"
    | "pending"
    | "vacation"
    | "fired"
    | "unemployed"
    | "employed";
  dateBirth?: string | Date;
  gender?: string;
  nationality?: string;
  maritalStatus?: "married" | "single" | "divorced" | "inRelationship";
  position?: string;
  comment?: string;
  isAvailable?: boolean;
  isRemote?: boolean;
  communicationPreferences?: string[];
  interests?: number[];
  contractPeriod?: IDateRange;
  leaveDays?: (Date | string)[];
  userId?: 0;
  thumbnail?: string;
  organization?: UserOrganizationModel;
  shortName?: string;
  phoneNumber?: string;
  countryId?: number;
  countryPhoneCode?: string;
  languageCode?: string;
}

export const UserModelDefault: UserModel = {
  id: undefined,
  image: undefined,
  firstName: undefined,
  lastName: undefined,
  nickName: undefined,
  age: undefined,
  email: undefined,
  phone: undefined,
  address: undefined,
  workStatus: undefined,
  dateBirth: undefined,
  gender: undefined,
  nationality: undefined,
  maritalStatus: undefined,
  position: undefined,
  comment: undefined,
  isAvailable: undefined,
  isRemote: undefined,
  communicationPreferences: undefined,
  interests: undefined,
  contractPeriod: undefined,
  leaveDays: undefined,
};
