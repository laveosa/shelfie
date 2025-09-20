export interface IItemsCardItemOption {
  idKey: string;
  nameKey: string;
  imageKeyPath?: string;
  type?: string;
}

export interface IItemsCardItem {
  id?: number;
  imageUrl?: string;
  name?: string;
  type?: string;
  originalItem?: any;
}

export interface IItemsCard {
  title?: string;
  items?: IItemsCardItem[];
  selectedId?: number;
  isLoading?: boolean;
  skeletonQuantity?: number;
  onAction?: (value: { item: any; type: string }) => void;
}
