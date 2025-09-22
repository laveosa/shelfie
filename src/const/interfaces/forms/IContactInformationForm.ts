import { UserModel } from "@/const/models/UserModel.ts";
import { ContactInformationModel } from "@/const/models/ContactInformationModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export interface IContactInformationForm {
  data?: ContactInformationModel;
  countryCodes?: CountryCodeModel[];
  notDisabledSubmit?: boolean;
  onSubmit?(value: UserModel): void;
  onCancel?(value: UserModel): void;
}
