import { GridFiltersModel } from "@/const/models/GridFiltersModel.ts";

export interface GridRequestModel {
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  totalPages?: number;
  startPage?: number;
  endPage?: number;
  items?: any[];
  searchQuery?: string;
  sortOption?: string;
  filter?: GridFiltersModel;
}
