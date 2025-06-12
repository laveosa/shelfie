export interface IItemsCard {
  isLoading?: boolean;
  isItemsLoading?: boolean;
  data?: any[];
  title?: string;
  skeletonQuantity?: number;
  onAction?: (data: any) => void;
  selectedItem?: any;
}
