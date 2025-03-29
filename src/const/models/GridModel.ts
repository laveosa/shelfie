export interface GridModel {
  pager?: {
    currentPage?: number;
    pageSize?: number;
    totalItems?: number;
    totalPages?: number;
    startPage?: number;
    endPage?: number;
  };
  items?: any[];
  searchQuery?: string;
  sortOption?: string;
}
