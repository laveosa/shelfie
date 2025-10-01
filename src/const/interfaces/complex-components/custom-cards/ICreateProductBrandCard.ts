import { BrandModel } from "@/const/models/BrandModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";

export interface ICreateProductBrandCard {
  isLoading?: boolean;
  isPhotoUploaderLoading?: boolean;
  brand?: BrandModel;
  selectedCompany?: CompanyModel;
  onAction?: (identifier: string, payload?: any) => void;
}
