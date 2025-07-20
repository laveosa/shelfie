export interface IInvoicesPageSlice {
  isLoading?: boolean;
  isProductMenuCardLoading?: boolean;
  isInvoicesCardLoading?: boolean;
  isInvoicePreviewCardLoading?: boolean;
  isInvoiceCardGridLoading?: boolean;
  activeCards?: any[];
  invoices?: any[];
}
