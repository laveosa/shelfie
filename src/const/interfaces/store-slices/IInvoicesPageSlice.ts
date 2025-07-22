import { GridModel } from "@/const/models/GridModel.ts";
import { InvoiceModel } from "@/const/models/InvoiceModel.ts";

export interface IInvoicesPageSlice {
  isLoading?: boolean;
  isProductMenuCardLoading?: boolean;
  isInvoicesCardLoading?: boolean;
  isInvoicePreviewCardLoading?: boolean;
  isInvoiceCardGridLoading?: boolean;
  isFileUploaderLoading?: boolean;
  activeCards?: any[];
  invoicesGridModel?: GridModel;
  invoices?: InvoiceModel[];
  previewUrl?: string;
}
