import { IDateRange } from "@/const/interfaces/IDateRange.ts";

export interface UserModel {
  id?: number;
  image?: string;
  firstName?: string;
  lastName?: string;
  nikName?: string;
  age?: number;
  email?: string;
  phone?: string;
  address?: string;
  status?:
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
  workingHours?: IDateRange;
  workingDays?: (Date | string)[];
}

export const UserModelDefault: UserModel = {
  id: undefined,
  image: undefined,
  firstName: undefined,
  lastName: undefined,
  nikName: undefined,
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
};
