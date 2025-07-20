import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductGalleryPageSlice } from "@/const/interfaces/store-slices/IProductGalleryPageSlice.ts";
import { ProductGalleryPageSliceActions as actions } from "@/state/slices/ProductGalleryPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice";
import { useToast } from "@/hooks/useToast.ts";
import cs from "@/pages/products-section/product-basic-data-page/ProductBasicDataPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import ProductPhotosCard from "@/components/complex/custom-cards/product-photos-card/ProductPhotosCard.tsx";
import ConnectImageCard from "@/components/complex/custom-cards/connect-image-card/ConnectImageCard.tsx";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import useInvoicesPageService from "@/pages/products-section/invoices-page/useInvoicesPageService.ts";

export function InvoicePage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<IProductGalleryPageSlice>(
    StoreSliceEnum.PRODUCT_GALLERY,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const service = useInvoicesPageService();
  const productsService = useProductsPageService();
  const { productId } = useParams();
  const { addToast } = useToast();
  const { openConfirmationDialog } = useDialogService();
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (productsState.products === null) {
      dispatch(productsActions.setIsItemsCardLoading(true));
      productsService
        .getTheProductsForGridHandler(productsState.gridRequestModel)
        .then((res) => {
          dispatch(productsActions.setIsItemsCardLoading(false));
          if (res) {
            dispatch(productsActions.refreshProducts(res.items));
          }
        });
    }
    if (!productsState.productCounter) {
      dispatch(productsActions.setIsProductMenuCardLoading(true));
      productsService.getCountersForProductsHandler(productId).then((res) => {
        dispatch(productsActions.setIsProductMenuCardLoading(false));
        if (res) {
          dispatch(productsActions.refreshProductCounter(res));
        }
      });
    }
    if (productsState.productPhotos.length === 0) {
      dispatch(actions.setIsProductPhotosCardLoading(true));
      productsService.getProductPhotosHandler(Number(productId)).then((res) => {
        dispatch(actions.setIsProductPhotosCardLoading(false));
        dispatch(productsActions.refreshProductPhotos(res));
      });
    }
  }, [productId]);

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

  async function onAction(actionType: string, payload: any) {
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
    }
  }

  return (
    <div className={cs.createProductPage}>
      <ProductMenuCard
        isLoading={productsState.isProductMenuCardLoading}
        title={productId ? "Manage Product" : "Create Product"}
        itemsCollection="products"
        counter={productsState.productCounter}
        productId={Number(productId)}
        activeCards={state.activeCards}
      />
      <ProductPhotosCard
        isLoading={state.isProductPhotosCardLoading}
        isImageUploaderLoading={state.isImageUploaderLoading}
        isGridLoading={productsState.isProductPhotosLoading}
        data={productsState.productPhotos}
        productCounter={productsState.productCounter}
        contextId={productId}
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
