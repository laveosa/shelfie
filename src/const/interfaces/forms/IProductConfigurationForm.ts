import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";

export interface IProductConfigurationForm {
  data?: ProductModel;
  brands?: BrandModel[];
  categories?: CategoryModel[];
  countryCodes?: CountryCodeModel[];
  productCode?: string;
  notDisabledSubmit?: boolean;
  showSecondaryButton?: boolean;
  onSubmit?(value: ProductModel): void;
  onCancel?(value: ProductModel): void;
  onAction?(identifier: string, payload?: any): void;
}
