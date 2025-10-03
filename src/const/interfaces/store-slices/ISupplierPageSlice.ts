import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";

export interface ISupplierPageSlice {
  isLoading?: boolean;
  isProductMenuCardLoading?: boolean;
  isSupplierCardLoading?: boolean;
  isSelectSupplierCardLoading?: boolean;
  isSupplierConfigurationCardLoading?: boolean;
  isCreateCompanyCardLoading?: boolean;
  isCompanyConfigurationCardLoading?: boolean;
  isLocationConfigurationCardLoading?: boolean;
  isSupplierPhotosGridLoading?: boolean;
  isSuppliersGridLoading?: boolean;
  isPhotoUploaderLoading?: boolean;
  isCompaniesGridLoading?: boolean;
  isLocationsGridLoading?: boolean;
  activeCards?: any[];
  purchase?: PurchaseModel;
  selectedCompany?: CompanyModel;
  managedCompany?: CompanyModel;
  companiesGridRequestModel: GridRequestModel;
  countryCodes?: CountryCodeModel[];
  managedLocation?: LocationModel;
}
