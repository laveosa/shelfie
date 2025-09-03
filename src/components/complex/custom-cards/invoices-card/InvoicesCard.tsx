import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useTranslation } from "react-i18next";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./InvoicesCard.module.scss";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { SheFileUploader } from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { IInvoiceCard } from "@/const/interfaces/complex-components/custom-cards/IInvoicesCard.ts";
import { InvoicesGridColumns } from "@/components/complex/grid/custom-grids/invoices-grid/InvoicesGridColumns.tsx";

export default function InvoicesCard({
  isLoading,
  isImageUploaderLoading,
  isGridLoading,
  data,
  contextId,
  onAction,
}: IInvoiceCard) {
  const { t } = useTranslation();

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

  return (
    <div className={cs.invoicesCard}>
      <SheProductCard
        loading={isLoading}
        title={t("CardTitles.Invoices")}
        className={cs.productPhotosCard}
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
              {t("CardTitles.ManageInvoices")}
            </div>
            <div className={cs.manageInvoicesGrid}>
              <DndGridDataTable
                isLoading={isGridLoading}
                className={cs.invoicesGrid}
                showHeader={false}
                columns={
                  InvoicesGridColumns(
                    onGridAction,
                    onDelete,
                  ) as ColumnDef<DataWithId>[]
                }
                data={data}
                skeletonQuantity={10}
                customMessage={t("InvoiceMessages.NoFilesUploaded")}
              />
            </div>
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
