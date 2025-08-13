import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { InvoicesPageSliceActions as actions } from "@/state/slices/InvoicesPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";
import cs from "@/pages/products-section/invoices-page/InvoicesPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
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
  const productsService = useProductsPageService();
  const { purchaseId } = useParams();
  const { addToast } = useToast();
  const { openConfirmationDialog } = useDialogService();
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) => state[StoreSliceEnum.INVOICES].activeCards,
    refreshAction: actions.refreshActiveCards,
  });

  useEffect(() => {
    if (!productsState.purchaseCounters) {
      dispatch(actions.setIsProductMenuCardLoading(true));
      productsService
        .getPurchaseCountersHandler(Number(purchaseId))
        .then(() => dispatch(actions.setIsProductMenuCardLoading(false)));
    }
    if (state.invoicesGridModel.items.length === 0) {
      dispatch(actions.setIsInvoiceCardGridLoading(true));
      service.getInvoicesForGridHandler(Number(purchaseId)).then(() => {
        dispatch(actions.setIsInvoiceCardGridLoading(false));
      });
    }
  }, [purchaseId]);

  async function onAction(actionType: string, payload: any) {
    switch (actionType) {
      case "uploadInvoice":
        dispatch(actions.setIsFileUploaderLoading(true));
        productsService.uploadPhotoHandler(payload).then((res) => {
          dispatch(actions.setIsFileUploaderLoading(false));
          if (res.data.assetId) {
            dispatch(actions.setIsProductMenuCardLoading(true));
            dispatch(actions.setIsInvoiceCardGridLoading(true));
            Promise.all([
              productsService.getPurchaseCountersHandler(Number(purchaseId)),
              service.getInvoicesForGridHandler(Number(purchaseId)),
            ]).then(() => {
              dispatch(actions.setIsProductMenuCardLoading(false));
              dispatch(actions.setIsInvoiceCardGridLoading(false));
            });
            addToast({
              text: "Invoice added successfully",
              type: "success",
            });
          } else {
            addToast({
              text: `${res.error.data.detail}`,
              type: "error",
            });
          }
        });
        break;
      case "previewInvoice":
        handleCardAction("invoicePreviewCard", true);
        dispatch(actions.refreshPreviewUrl(payload.url));
        break;
      case "deleteInvoice":
        payload.table.options.meta?.hideRow(payload.row.original.id);
        const confirmedDeleteInvoice = await openConfirmationDialog({
          title: "Delete Invoice",
          text: `You are about to delete invoice "${payload.row.original.originalName}".`,
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });
        if (!confirmedDeleteInvoice) {
          payload.table.options.meta?.unhideRow(payload.row.original.id);
        } else {
          await productsService
            .deletePhotoHandler(payload.row.original.assetId)
            .then((res) => {
              if (!res) {
                addToast({
                  text: "Invoice deleted successfully",
                  type: "success",
                });
              } else {
                payload.table.options.meta?.unhideRow(payload.row.original.id);
                addToast({
                  text: res.error.data.detail,
                  type: "error",
                });
              }
            });
        }
        break;
      case "downloadInvoice":
        service.downloadAssetHandler(payload.assetId).then((res) => {
          if (res?.data instanceof Blob) {
            const url = window.URL.createObjectURL(res.data);

            const a = document.createElement("a");
            a.href = url;
            a.download = "invoice.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            addToast({
              text: "Invoice is downloading",
              type: "success",
            });
          } else {
            addToast({
              text: res.error.data.detail,
              type: "error",
            });
          }
        });
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
