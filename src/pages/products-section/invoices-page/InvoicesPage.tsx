import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductGalleryPageSlice } from "@/const/interfaces/store-slices/IProductGalleryPageSlice.ts";
import { InvoicesPageSliceActions as actions } from "@/state/slices/InvoicesPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";
import cs from "@/pages/products-section/invoices-page/InvoicesPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import ConnectImageCard from "@/components/complex/custom-cards/connect-image-card/ConnectImageCard.tsx";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import useInvoicesPageService from "@/pages/products-section/invoices-page/useInvoicesPageService.ts";
import InvoicesCard from "@/components/complex/custom-cards/invoices-card/InvoicesCard.tsx";

export function InvoicesPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<IProductGalleryPageSlice>(
    StoreSliceEnum.INVOICES,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const service = useInvoicesPageService();
  const productsService = useProductsPageService();
  const { purchaseId } = useParams();
  const { addToast } = useToast();
  const { openConfirmationDialog } = useDialogService();
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (!productsState.purchaseCounters) {
      dispatch(actions.setIsProductMenuCardLoading(true));
      productsService
        .getPurchaseCountersHandler(Number(purchaseId))
        .then(() => dispatch(actions.setIsProductMenuCardLoading(false)));
    }
  }, [purchaseId]);

  function scrollToCard(cardId: string) {
    setTimeout(() => {
      const cardElement = cardRefs.current[cardId];
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }

  function handleCardAction(
    identifier: string,
    forceOpen: boolean = false,
    overrideActiveCards?: string[],
  ) {
    const activeCards = overrideActiveCards ?? state.activeCards;
    let updatedCards: string[];

    if (forceOpen) {
      if (!activeCards.includes(identifier)) {
        updatedCards = [...activeCards, identifier];
        dispatch(actions.refreshActiveCards(updatedCards));
        scrollToCard(identifier);
      } else {
        dispatch(actions.refreshActiveCards(activeCards));
      }
    } else {
      updatedCards = activeCards.filter((card) => card !== identifier);
      dispatch(actions.refreshActiveCards(updatedCards));
    }
  }

  async function onAction(actionType: string, _payload: any) {
    switch (actionType) {
      case "uploadPhoto":
        // dispatch(actions.setIsImageUploaderLoading(true));
        // service.uploadPhotoHandler(payload).then((res) => {
        //   dispatch(actions.setIsImageUploaderLoading(false));
        //   if (res.data.photoId) {
        //     productsService
        //       .getProductPhotosHandler(Number(productId))
        //       .then((res) => {
        //         dispatch(productsActions.refreshProductPhotos(res));
        //       });
        //     productsService
        //       .getCountersForProductsHandler(productId)
        //       .then((res) => {
        //         dispatch(productsActions.refreshProductCounter(res));
        //       });
        //     addToast({
        //       text: "Photos added successfully",
        //       type: "success",
        //     });
        //   } else {
        //     addToast({
        //       text: `${res.error.data.detail}`,
        //       type: "error",
        //     });
        //   }
        // });
        break;
      case "closeInvoicesCard":
        handleCardAction("invoicesCard");
        break;
    }
  }

  return (
    <div className={cs.invoicesPage}>
      <ProductMenuCard
        isLoading={state.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        productId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
      />
      <InvoicesCard
        isLoading={state.isInvoicesCardLoading}
        isGridLoading={state.isInvoiceCardGridLoading}
        data={state.invoices}
        contextId={Number(purchaseId)}
        onAction={onAction}
      />
      {state.activeCards.includes("connectImageCard") && (
        <div
          ref={(el) => {
            cardRefs.current["connectImageCard"] = el;
          }}
        >
          <ConnectImageCard
            isLoading={state.isConnectImageCardLoading}
            isGridLoading={state.isVariantsGridLoading}
            variants={state.productVariants}
            selectedPhoto={state.selectedPhoto}
            productCounter={productsState.productCounter}
            onAction={onAction}
            onSecondaryButtonClick={() => handleCardAction("connectImageCard")}
          />
        </div>
      )}
    </div>
  );
}
