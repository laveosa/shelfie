export interface ContactInformationModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  newEmail?: string;
  phoneNumber?: string;
  newPhoneNumber?: string;
  countryCode?: string;
  newCountryCode?: string;
}

export const ContactInformationModelDefaultModel: ContactInformationModel = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  newEmail: undefined,
  phoneNumber: undefined,
  newPhoneNumber: undefined,
  countryCode: undefined,
  newCountryCode: undefined,
};
