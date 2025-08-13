import { GridModel } from "@/const/models/GridModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { IPurchaseSummaryModel } from "@/const/models/PurchaseSummaryModel.ts";

export interface IPurchaseProductsCard {
  isLoading?: boolean;
  isPurchaseProductsGridLoading?: boolean;
  isProductsGridLoading?: boolean;
  variants?: any[];
  purchaseProducts?: any[];
  variantsGridModel?: GridModel;
  purchaseProductsGridModel?: GridModel;
  sortingOptions?: any;
  preferences?: any;
  brands?: BrandModel[];
  categories?: CategoryModel[];
  purchaseProductsSkeletonQuantity?: number;
  variantsSkeletonQuantity?: number;
  currencies?: CurrencyModel[];
  purchaseSummary?: IPurchaseSummaryModel;
  taxes?: TaxTypeModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
