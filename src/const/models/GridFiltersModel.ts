export interface GridFiltersModel {
  brands?: number[];
  categories?: number[];
  suppliers?: number[];
  dateFrom?: string;
  dateTo?: string;
  valueFrom?: number;
  valueTo?: number;
  showDeleted?: string;
  traitOptions?: number[];
}
