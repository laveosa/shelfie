import { UseFormReturn } from "react-hook-form";

import { CompanyModel } from "@/const/models/CompanyModel.ts";
import { AppFormType } from "@/const/types/AppFormType.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export interface ICreateCompanyForm {
  className?: string;
  data?: CompanyModel;
  countryCodes?: ISheSelectItem<number>[];
  onChange?: (
    value: CompanyModel,
    form?: UseFormReturn<AppFormType<CompanyModel>>,
  ) => void;
}
