export interface ISelectPurchaseCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  purchases?: any[];
  onAction?: (identifier?: string, payload?: any) => void;
}
