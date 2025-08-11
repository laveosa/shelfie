export interface ISelectDiscountCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  discounts?: any[];
  onAction?: (identifier?: string, payload?: any) => void;
}
