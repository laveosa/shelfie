export interface IProductMenuCard {
  productId?: number;

  onAction?: (identifier: string) => void;
}
