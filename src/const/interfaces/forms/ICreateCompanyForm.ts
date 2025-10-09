import { UseFormReturn } from "react-hook-form";

import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";
import { AppFormType } from "@/const/types/AppFormType.ts";

export interface ICreateCompanyForm {
  className?: string;
  data?: CompanyModel;
  countryCodes?: CountryCodeModel[];
  onChange?: (
    value: CompanyModel,
    form?: UseFormReturn<AppFormType<CompanyModel>>,
  ) => void;
  onSubmit?: (data: CompanyModel) => void;
  onCancel?: () => void;
}
