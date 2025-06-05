import { SupplierModel } from "@/const/models/SupplierModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export interface ICreateSupplierForm<T> {
  data?: SupplierModel;
  countryList?: CountryCodeModel[];
  onSubmit?: (data: T) => void;
  onImageUpload?: (data: T) => void;
  onCancel?: (data: T) => void;
}
