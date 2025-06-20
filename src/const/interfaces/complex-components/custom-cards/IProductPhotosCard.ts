export interface IProductPhotosCard {
  isLoading?: boolean;
  isImageUploaderLoading?: boolean;
  isGridLoading?: boolean;
  data?: any;
  contextId?: any;
  productCounter?: any;
  showCloseButton?: boolean;
  onAction?: (identifier: string, payload?: any) => void;
}
