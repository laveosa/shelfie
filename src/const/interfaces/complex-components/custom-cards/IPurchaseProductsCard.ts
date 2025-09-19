import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { IPurchaseSummaryModel } from "@/const/models/PurchaseSummaryModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface IPurchaseProductsCard {
  isLoading?: boolean;
  isPurchaseProductsGridLoading?: boolean;
  isProductsGridLoading?: boolean;
  variantsGridRequestModel?: GridRequestModel;
  purchaseProductsGridRequestModel?: GridRequestModel;
  sortingOptions?: any;
  preferences?: any;
  brands?: BrandModel[];
  categories?: CategoryModel[];
  colorsForFilter?: TraitOptionModel[];
  sizesForFilter?: TraitOptionModel[];
  purchaseProductsSkeletonQuantity?: number;
  variantsSkeletonQuantity?: number;
  currencies?: CurrencyModel[];
  purchaseSummary?: IPurchaseSummaryModel;
  purchaseId?: any;
  taxes?: TaxTypeModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
