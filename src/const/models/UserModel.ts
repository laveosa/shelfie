import { IDateRange } from "@/const/interfaces/IDateRange.ts";

export interface UserModel {
  id?: string;
  image?: string; // file uploader
  firstName?: string; // input
  lastName?: string; // input
  nickName?: string; // input editor
  age?: number; // input
  email?: string; // input
  phone?: string; // input
  address?: string; // input
  status?:
    | "active"
    | "pending"
    | "vacation"
    | "fired"
    | "unemployed"
    | "employed"; // radio group
  dateBirth?: string | Date; // datepicker
  gender?: string; // select
  nationality?: string; // select
  maritalStatus?: "married" | "single" | "divorced" | "inRelationship"; // radio group
  position?: string; // select
  comment?: string; // textarea
  isAvailable?: boolean; // toggle
  isRemote?: boolean; // toggle
  communicationPreferences?: string[]; // checkbox
  interests?: number[]; // multiselect display with badge list
  contractPeriod?: IDateRange; // calendar
  leaveDays?: (Date | string)[]; // calendar
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
  status: undefined,
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
