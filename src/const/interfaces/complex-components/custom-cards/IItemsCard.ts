export interface IItemsCard {
  isLoading?: boolean;
  data?: any[];
  title?: string;
  skeletonQuantity?: number;
  onAction?: (item) => void;
  selectedItem?: any;
}
