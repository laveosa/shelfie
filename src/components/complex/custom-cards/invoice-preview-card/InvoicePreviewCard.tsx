import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./InvoicePreviewCard.module.scss";
import { IInvoicePreviewCard } from "@/const/interfaces/complex-components/custom-cards/IInvoicePreviewCard.ts";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function InvoicePreviewCard({
  isLoading,
  onAction,
}: IInvoicePreviewCard) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

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
        title="Preview"
        minWidth="500px"
        showCloseButton={true}
        onSecondaryButtonClick={() => onAction("closeInvoicePreviewCard")}
        className={cs.productPhotosCard}
      >
        <div className={cs.invoicesCardContent}>
          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.3)",
              height: "750px",
            }}
          >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer
                fileUrl="/files/Sertyfikat 40389988.pdf"
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </div>
        </div>
      </SheProductCard>
    </div>
  );
}
