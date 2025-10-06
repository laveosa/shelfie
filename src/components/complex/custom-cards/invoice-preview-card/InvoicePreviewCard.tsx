import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import React from "react";

import * as pdfjsLib from "pdfjs-dist";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import cs from "./InvoicePreviewCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { IInvoicePreviewCard } from "@/const/interfaces/complex-components/custom-cards/IInvoicePreviewCard.ts";

export default function InvoicePreviewCard({
  isLoading,
  previewUrl,
  onAction,
}: IInvoicePreviewCard) {
  // ==================================================================== UTILITIES
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.invoicesCard}
      title="Preview"
      titleTransKey="CardTitles.Preview"
      minWidth="600px"
      isLoading={isLoading}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeInvoicePreviewCard")}
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
    </SheCard>
  );
}
