import { OrganizationModel } from "@/const/models/OrganizationModel.ts";

export interface ContactInformationModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  countryCode?: string;
  countryPhoneCode?: string;
  countryId?: number;
  languageCode?: string;
  localeCode?: string;
  organization?: OrganizationModel;
  shortName?: string;
  thumbnail?: string;
  userId?: number;
}

export const ContactInformationModelDefaultModel: ContactInformationModel = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  phoneNumber: undefined,
  countryCode: undefined,
  countryPhoneCode: undefined,
  countryId: null,
  localeCode: undefined,
  organization: undefined,
  shortName: undefined,
  thumbnail: undefined,
  userId: null,
};
