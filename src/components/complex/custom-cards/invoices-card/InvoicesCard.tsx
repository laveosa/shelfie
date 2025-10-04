import React from "react";

import cs from "./InvoicesCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { SheFileUploader } from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { InvoicesGridColumns } from "@/components/complex/grid/custom-grids/invoices-grid/InvoicesGridColumns.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { IInvoiceCard } from "@/const/interfaces/complex-components/custom-cards/IInvoicesCard.ts";

export default function InvoicesCard({
  isLoading,
  isImageUploaderLoading,
  isGridLoading,
  data,
  contextId,
  onAction,
}: IInvoiceCard) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== EVENT HANDLERS
  function onGridAction(
    actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    switch (actionType) {
      case "preview":
        onAction("previewInvoice", row.original);
        break;
      case "download":
        onAction("downloadInvoice", row.original);
        break;
    }
  }

  function onDelete(data) {
    onAction("deleteInvoice", data);
  }

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.invoicesCard}
      title="Invoices"
      titleTransKey="CardTitles.Invoices"
      isLoading={isLoading}
    >
      <div className={cs.invoicesCardContent}>
        <SheFileUploader
          isLoading={isImageUploaderLoading}
          contextName="invoiceDocument"
          viewMode="file"
          contextId={contextId}
          acceptedFileTypes={{
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
              [".docx"],
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
              [".xlsx"],
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
          }}
          onUpload={(uploadModel: UploadPhotoModel) =>
            onAction("uploadInvoice", uploadModel)
          }
        />
        <div className={cs.manageInvoices}>
          <div className={`${cs.manageInvoicesTitle} she-title`}>
            {translate("CardTitles.ManageInvoices")}
          </div>
          <div className={cs.manageInvoicesGrid}>
            <SheGrid
              isLoading={isGridLoading}
              className={cs.invoicesGrid}
              showHeader={false}
              columns={InvoicesGridColumns(onGridAction, onDelete)}
              data={data}
              skeletonQuantity={10}
              customMessage="There are no files uploaded yet"
              customMessageTransKey="InvoiceMessages.NoFilesUploaded"
            />
          </div>
        </div>
      </div>
    </SheCard>
  );
}
