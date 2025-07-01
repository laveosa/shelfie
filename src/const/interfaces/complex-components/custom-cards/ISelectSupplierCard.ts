export interface ISelectSupplierCard {
  isLoading?: boolean;
  suppliers?: any[];
  onAction?: (identifier?: string, payload?: any) => void;
}
