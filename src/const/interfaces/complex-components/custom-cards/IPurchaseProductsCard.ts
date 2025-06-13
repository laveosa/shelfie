import { ProductModel } from "@/const/models/ProductModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";

export interface IPurchaseProductsCard {
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
}
