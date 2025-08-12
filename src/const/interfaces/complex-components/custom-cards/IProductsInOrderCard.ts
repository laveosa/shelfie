export interface IProductsInOrderCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  stockActions?: any[];
  onAction?: (identifier: string, payload?: any) => void;
}
