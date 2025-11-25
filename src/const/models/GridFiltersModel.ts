export interface GridFiltersModel {
  brands?: number[];
  categories?: number[];
  suppliers?: number[];
  dateFrom?: string;
  dateTo?: string;
  valueFrom?: number;
  valueTo?: number;
  showDeleted?: boolean;
  traitOptions?: number[];
  status?: any;
  statuses?: any;
  prepackedCartStatus?: any;
  customers?: number[];
}
