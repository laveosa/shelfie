export interface IItemsCard {
  isLoading?: boolean;
  isItemsLoading?: boolean;
  data?: any[];
  title?: string;
  skeletonQuantity?: number;
  onAction?: (item) => void;
  selectedItem?: any;
}
