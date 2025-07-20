import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./InvoicesCard.module.scss";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { SheFileUploader } from "@/components/complex/she-file-uploader/SheFileUploader.tsx";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { IInvoiceCard } from "@/const/interfaces/complex-components/custom-cards/IInvoicesCard.ts";
import { InvoicesGridColumns } from "@/components/complex/grid/invoices-grid/InvoicesGridColumns.tsx";

export default function InvoicesCard({
  isLoading,
  isImageUploaderLoading,
  isGridLoading,
  data,
  contextId,
  onAction,
}: IInvoiceCard) {
  function handleAction(actionType: string, payload?: any): any {
    switch (actionType) {
      case "upload":
        onAction("uploadPhoto", payload);
        break;
      case "delete":
        onAction("deletePhoto", payload);
        break;
      case "connect":
        onAction("openConnectImageCard", payload);
        break;
      case "dnd":
        const { newIndex, activeItem, oldIndex } = payload;
        onAction("changePhotoPosition", { newIndex, activeItem, oldIndex });
        break;
    }
  }

  function onGridAction(
    actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    switch (actionType) {
      case "delete":
        handleAction("delete", row.original);
        break;
      case "connect":
        handleAction("connect", row.original);
        break;
    }
  }

  return (
    <div className={cs.invoicesCard}>
      <SheProductCard
        loading={isLoading}
        title="Invoices"
        className={cs.productPhotosCard}
      >
        <div className={cs.invoicesCardContent}>
          <SheFileUploader
            isLoading={isImageUploaderLoading}
            contextName={"product"}
            viewMode="file"
            contextId={contextId}
            acceptedFileTypes={{
              "application/pdf": [".pdf"],
            }}
            onUpload={(uploadModel: UploadPhotoModel) =>
              handleAction("upload", uploadModel)
            }
          />
          <div className={cs.manageInvoices}>
            <div className={`${cs.manageInvoicesTitle} she-title`}>
              Manage Invoices
            </div>
            <div className={cs.manageInvoicesGrid}>
              <DndGridDataTable
                isLoading={isGridLoading}
                className={cs.invoicesGrid}
                showHeader={false}
                columns={
                  InvoicesGridColumns(onGridAction) as ColumnDef<DataWithId>[]
                }
                data={data}
                skeletonQuantity={10}
                customMessage="There are no files uploaded yet"
              />
            </div>
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
