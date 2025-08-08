import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface IProductsInOrderCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  stockActions?: any[];
  gridModel?: GridModel;
  gridRequestModel?: GridRequestModel;
  onAction?: (identifier: string, payload?: any) => void;
}
