import { ProductModel } from "@/const/models/ProductModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";

export interface IPurchaseProductsCard {
  isLoading?: boolean;
  isPurchaseProductsGridLoading?: boolean;
  isProductsGridLoading?: boolean;
  products?: ProductModel[];
  purchaseProducts?: ProductModel[];
  productsGridModel?: GridModel;
  purchaseProductsGridModel?: GridModel;
  sortingOptions?: any;
  preferences?: any;
  brands?: BrandModel[];
  categories?: CategoryModel[];
  purchaseProductsSkeletonQuantity?: number;
  productsSkeletonQuantity?: number;
  currencies?: CurrencyModel[];
  taxes?: TaxTypeModel[];
}
