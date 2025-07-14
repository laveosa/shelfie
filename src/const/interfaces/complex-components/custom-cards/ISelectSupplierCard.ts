export interface ISelectSupplierCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  suppliers?: any[];
  onAction?: (identifier?: string, payload?: any) => void;
}
