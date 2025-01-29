import { ProductsModel } from "@/const/models/ProductsModel.ts";

export interface GridModel {
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
  sortOption?: string;
}
