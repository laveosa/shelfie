import { ContactInformationModel } from "@/const/models/ContactInformationModel.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export interface IContactInformationForm {
  data?: ContactInformationModel;
  countryCodes?: ISheSelectItem<number>[];
  notDisabledSubmit?: boolean;
  onSubmit?(value: ContactInformationModel): void;
}
