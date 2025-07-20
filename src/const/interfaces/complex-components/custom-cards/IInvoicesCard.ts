export interface IInvoiceCard {
  isLoading?: boolean;
  isImageUploaderLoading?: boolean;
  isGridLoading?: boolean;
  data: any[];
  contextId?: number;
  onAction?: (identifier: string, payload?: any) => void;
}
