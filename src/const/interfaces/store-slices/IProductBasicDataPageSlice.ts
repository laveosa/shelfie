import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { CompanyModel } from "@/const/models/CompanyModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface IProductBasicDataPageSlice {
  isLoading?: boolean;
  isProductConfigurationCardLoading?: boolean;
  isCreateProductCategoryCardLoading?: boolean;
  isCreateProductBrandCardLoading?: boolean;
  isSelectEntityCardLoading?: boolean;
  isCreateCompanyCardLoading?: boolean;
  isProductsLoading?: boolean;
  isPhotoUploaderLoading?: boolean;
  isCompaniesGridLoading?: boolean;
  product?: ProductModel;
  countryCodes?: CountryCodeModel[];
  brandsList?: BrandModel[];
  categoriesList?: CategoryModel[];
  category?: CategoryModel;
  brand?: BrandModel;
  contextId?: number;
  products?: ProductModel[];
  activeCards?: any[];
  productCounter?: ProductCountersModel;
  photos?: ImageModel[];
  selectedCompany?: CompanyModel;
  companiesList?: CompanyModel[];
  companiesGridRequestModel?: GridRequestModel;
}
