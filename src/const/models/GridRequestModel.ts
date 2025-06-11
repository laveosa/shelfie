import { GridFiltersModel } from "@/const/models/GridFiltersModel.ts";

export interface GridRequestModel {
  currentPage?: number;
  pageSize?: number;
  searchQuery?: string;
  sortOption?: string;
  brands?: number[];
  categories?: number[];
  filter?: GridFiltersModel;
}
