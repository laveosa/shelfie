import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import cs from "@/pages/products-section/invoices-page/InvoicesPage.module.scss";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";
import InvoicesCard from "@/components/complex/custom-cards/invoices-card/InvoicesCard.tsx";
import InvoicePreviewCard from "@/components/complex/custom-cards/invoice-preview-card/InvoicePreviewCard.tsx";
import { InvoicesPageSliceActions as actions } from "@/state/slices/InvoicesPageSlice.ts";
import useInvoicesPageService from "@/pages/products-section/invoices-page/useInvoicesPageService.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";

export function InvoicesPage() {
  // ==================================================================== UTILITIES
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) => state[StoreSliceEnum.INVOICES].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const { state, productsState, ...service } =
    useInvoicesPageService(handleCardAction);
  const { purchaseId } = useParams();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getPurchaseCountersHandler(Number(purchaseId));
    service.getInvoicesForGridHandler(Number(purchaseId));
  }, [purchaseId]);

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, payload: any) {
    switch (actionType) {
      case "uploadInvoice":
        service.uploadInvoiceHandler(Number(purchaseId), payload);
        break;
      case "previewInvoice":
        service.previewInvoiceHandler(payload);
        break;
      case "deleteInvoice":
        service.deleteInvoiceHandler(payload, purchaseId);
        break;
      case "downloadInvoice":
        service.downloadInvoice(payload);
        break;
      case "closeInvoicePreviewCard":
        service.closeInvoicePreviewCardHandler();
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.invoicesPage}>
      <SheContextSidebar
        menuCollectionType="purchases"
        menuTitle="Report Purchase"
        itemId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
        activeCards={state.activeCards}
      >
        <InvoicesCard
          isLoading={state.isInvoicesCardLoading}
          isGridLoading={state.isInvoiceCardGridLoading}
          isImageUploaderLoading={state.isFileUploaderLoading}
          data={state.invoicesGridRequestModel.items}
          contextId={Number(purchaseId)}
          onAction={onAction}
        />
        {state.activeCards.includes("invoicePreviewCard") && (
          <div ref={createRefCallback("invoicePreviewCard")}>
            <InvoicePreviewCard
              previewUrl={state.previewUrl}
              onAction={onAction}
            />
          </div>
        )}
      </SheContextSidebar>
    </div>
  );
}
