export interface IProductCard {
  data?: any[];
  title?: "Products" | string;
  onAction?: (item) => void;
  selectedItem?: any;
}
