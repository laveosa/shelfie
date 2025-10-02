export interface IPhotosCard {
  isLoading?: boolean;
  isImageUploaderLoading?: boolean;
  isGridLoading?: boolean;
  data?: any;
  contextName?: string;
  contextId?: any;
  columns?: any;
  noDataText?: string;
  skeletonQuantity?: number;
  showCloseButton?: boolean;
  onAction?: (identifier: string, payload?: any) => void;
}
