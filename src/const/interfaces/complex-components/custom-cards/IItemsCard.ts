export interface IItemsCard {
  data?: any[];
  title?: string;
  onAction?: (item) => void;
  selectedItem?: any;
}
