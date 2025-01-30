export interface GridRequestModel {
  currentPage?: number;
  pageSize?: number;
  searchQuery?: string;
  sortOption?: string;
  brands?: number[];
  categories?: number[];
}
