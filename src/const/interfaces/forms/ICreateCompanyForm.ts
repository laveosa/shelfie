import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";

export interface ICreateCompanyForm<T> {
  isLoading?: boolean;
  className?: string;
  data?: CompanyModel;
  countryCodes?: CountryCodeModel[];
  onSubmit?: (data: T) => void;
  onCancel?: () => void;
  onHandleUpData?: (data: any) => void;
}
