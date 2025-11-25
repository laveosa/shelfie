import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface IDashboardPageSlice {
  brands?: BrandModel[];
  categories?: CategoryModel[];
  customers?: CustomerModel[];
  dashboardGridRequestModel?: GridRequestModel;
}
