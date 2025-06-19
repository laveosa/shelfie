import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";

export interface IPurchaseProductsPageSlice {
  isLoading?: boolean;
  isProductMenuCardLoading?: boolean;
  isPurchaseProductsCardLoading?: boolean;
  isPurchasesProductsGridLoading?: boolean;
  isProductsGridLoading?: boolean;
  isProductConfigurationCardLoading?: boolean;
  isManageProductCardLoading?: boolean;
  activeCards?: any[];
  activeTab?: string;
  selectedProduct?: ProductModel;
  purchasesProductsGridModel?: GridModel;
  purchasesProductsGridRequestModel?: GridRequestModel;
  purchaseProducts?: ProductModel[];
  brands?: BrandModel[];
  categories?: CategoryModel[];
}
