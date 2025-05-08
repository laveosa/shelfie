export interface IItemsCard {
  isLoading?: boolean;
  data?: any[];
  title?: string;
  onAction?: (item) => void;
  selectedItem?: any;
}
