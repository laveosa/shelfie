export interface IInvoicePreviewCard {
  isLoading?: boolean;
  onAction?: (identifier: string, payload?: any) => void;
}
