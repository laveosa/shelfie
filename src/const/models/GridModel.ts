import { ProductModel } from "@/const/models/ProductModel.ts";

export interface GridModel {
  pager?: {
    currentPage?: number;
    pageSize?: number;
    totalItems?: number;
    totalPages?: number;
    startPage?: number;
    endPage?: number;
  };
  items?: ProductModel[];
  searchQuery?: string;
  sortOption?: string;
}
