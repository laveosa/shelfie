import { ContactInformationModel } from "@/const/models/ContactInformationModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export interface IContactInformationForm {
  data?: ContactInformationModel;
  countryCodes?: CountryCodeModel[];
  notDisabledSubmit?: boolean;
  onSubmit?(value: ContactInformationModel): void;
  onCancel?(value: ContactInformationModel): void;
}
