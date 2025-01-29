export interface ProductsGridRequestModel {
  currentPage?: number;
  pageSize?: number;
  searchQuery?: string;
  sortOption?: string;
  brands?: number[];
  categories?: number[];
}
