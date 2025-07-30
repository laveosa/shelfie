import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import * as pdfjsLib from "pdfjs-dist";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./InvoicePreviewCard.module.scss";
import { IInvoicePreviewCard } from "@/const/interfaces/complex-components/custom-cards/IInvoicePreviewCard.ts";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function InvoicePreviewCard({
  isLoading,
  previewUrl,
  onAction,
}: IInvoicePreviewCard) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className={cs.invoicesCard}>
      <SheProductCard
        loading={isLoading}
        title="Preview"
        minWidth="600px"
        showCloseButton={true}
        onSecondaryButtonClick={() => onAction("closeInvoicePreviewCard")}
        className={cs.productPhotosCard}
      >
        <div className={cs.invoicesCardContent}>
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`}
          >
            <Viewer
              fileUrl={previewUrl}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </div>
      </SheProductCard>
    </div>
  );
}
