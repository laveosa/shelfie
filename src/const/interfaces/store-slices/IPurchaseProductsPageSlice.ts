import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";

export interface IPurchaseProductsPageSlice {
  isLoading?: boolean;
  isProductMenuCardLoading?: boolean;
  isPurchaseProductsCardLoading?: boolean;
  isPurchasesProductsGridLoading?: boolean;
  isProductsGridLoading?: boolean;
  activeCards?: any[];
  activeTab?: string;
  purchasesProductsGridModel?: GridModel;
  purchasesProductsGridRequestModel?: GridRequestModel;
  purchaseProducts?: ProductModel[];
}
