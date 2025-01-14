import { ProductsModel } from "@/const/models/ProductsModel.ts";

export interface GridRequestModel {
  pager?: {
    currentPage?: number;
    pageSize?: number;
    totalItems?: number;
    totalPages?: number;
    startPage?: number;
    endPage?: number;
  };
  items?: ProductsModel[];
  searchQuery?: string;
  productOrder?: string;
}
