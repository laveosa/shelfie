export interface ProductsGridRequestModel {
  currentPage?: number;
  pageSize?: number;
  searchQuery?: string;
  sortOption?: string;
  brands?: string[];
  categories?: string[];
}
