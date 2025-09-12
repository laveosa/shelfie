import { GridFiltersModel } from "@/const/models/GridFiltersModel.ts";

export interface GridRequestModel {
  currentPage?: number;
  pageSize?: number;
  searchQuery?: string;
  sortOption?: string;
  filter?: GridFiltersModel;
  items?: any[];
  totalItems?: number;
  totalPages?: number;
  startPage?: number;
  endPage?: number;
}
