export interface IInvoicePreviewCard {
  isLoading?: boolean;
  previewUrl?: string;
  onAction?: (identifier: string, payload?: any) => void;
}
