import { InvoiceModel } from "@/const/models/InvoiceModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface IInvoicesPageSlice {
  isLoading?: boolean;
  isProductMenuCardLoading?: boolean;
  isInvoicesCardLoading?: boolean;
  isInvoicePreviewCardLoading?: boolean;
  isInvoiceCardGridLoading?: boolean;
  isFileUploaderLoading?: boolean;
  activeCards?: any[];
  invoicesGridRequestModel?: GridRequestModel;
  invoices?: InvoiceModel[];
  previewUrl?: string;
}
