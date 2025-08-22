import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { InvoicesPageSliceActions as actions } from "@/state/slices/InvoicesPageSlice.ts";
import cs from "@/pages/products-section/invoices-page/InvoicesPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import useInvoicesPageService from "@/pages/products-section/invoices-page/useInvoicesPageService.ts";
import InvoicesCard from "@/components/complex/custom-cards/invoices-card/InvoicesCard.tsx";
import InvoicePreviewCard from "@/components/complex/custom-cards/invoice-preview-card/InvoicePreviewCard.tsx";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { IInvoicesPageSlice } from "@/const/interfaces/store-slices/IInvoicesPageSlice.ts";

export function InvoicesPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<IInvoicesPageSlice>(StoreSliceEnum.INVOICES);
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const service = useInvoicesPageService();
  const { purchaseId } = useParams();
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) => state[StoreSliceEnum.INVOICES].activeCards,
    refreshAction: actions.refreshActiveCards,
  });

  useEffect(() => {
    service.getPurchaseCountersHandler(Number(purchaseId));
    service.getInvoicesForGridHandler(Number(purchaseId));
  }, [purchaseId]);

  async function onAction(actionType: string, payload: any) {
    switch (actionType) {
      case "uploadInvoice":
        service.uploadInvoiceHandler(Number(purchaseId), payload);
        break;
      case "previewInvoice":
        handleCardAction("invoicePreviewCard", true);
        dispatch(actions.refreshPreviewUrl(payload.url));
        break;
      case "deleteInvoice":
        service.deleteInvoiceHandler(payload, purchaseId);
        break;
      case "downloadInvoice":
        service.downloadInvoice(payload);
        break;
      case "closeInvoicePreviewCard":
        handleCardAction("invoicePreviewCard");
        dispatch(actions.refreshPreviewUrl(null));
        break;
    }
  }

  return (
    <div className={cs.invoicesPage}>
      <ProductMenuCard
        isLoading={state.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        itemId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
      />
      <InvoicesCard
        isLoading={state.isInvoicesCardLoading}
        isGridLoading={state.isInvoiceCardGridLoading}
        isImageUploaderLoading={state.isFileUploaderLoading}
        data={state.invoicesGridModel.items}
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
    </div>
  );
}
