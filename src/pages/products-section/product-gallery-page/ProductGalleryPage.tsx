import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import cs from "./ProductGalleryPage.module.scss";
import ProductPhotosCard from "@/components/complex/custom-cards/product-photos-card/ProductPhotosCard.tsx";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";
import ConnectImageCard from "@/components/complex/custom-cards/connect-image-card/ConnectImageCard.tsx";
import useProductGalleryPageService from "@/pages/products-section/product-gallery-page/useProductGalleryPageService.ts";
import { ProductGalleryPageSliceActions as actions } from "@/state/slices/ProductGalleryPageSlice.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";

export function ProductGalleryPage() {
  // ==================================================================== UTILITIES
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.PRODUCT_GALLERY].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const { state, productsState, productsService, ...service } =
    useProductGalleryPageService(handleCardAction);
  const { productId } = useParams();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getProductGalleryPageDataHandler(productId);
  }, [productId]);

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, payload: any) {
    switch (actionType) {
      case "itemCardClick":
        productsService.itemCardHandler(payload);
        break;
      case "uploadPhoto":
        service.uploadPhotoHandler(payload, productId);
        break;
      case "changePhotoPosition":
        service.putPhotoInNewPositionHandler(payload, productId);
        break;
      case "deletePhoto":
        service.deletePhotoHandler(payload, productId);
        break;
      case "activatePhoto":
        service.setPhotoActivationStateHandler(Number(productId), payload);
        break;
      case "openConnectImageCard":
        service.openConnectImageCard(payload);
        break;
      case "imageActions":
        service.imageActionsHandler(payload);
        break;
      case "closeConnectImageCard":
        service.closeConnectImageCardHandler();
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.productGalleryPage}>
      <SheContextSidebar
        menuCollectionType="products"
        menuTitle="Manage Product"
        isListLoading={productsState.isItemsCardLoading}
        listItems={productsState[productsState.activeTab]}
        showListItems
        selectedId={
          productsState.activeTab === "products"
            ? productId
            : productsState.selectedVariant?.variantId
        }
        skeletonQuantity={
          productsState.activeTab === "products"
            ? productsState.products?.length
            : productsState.variants?.length
        }
        activeTab={productsState.activeTab}
        counter={productsState.productCounter}
        itemId={Number(productId)}
        activeCards={state.activeCards}
        onAction={(item) => onAction("itemsCardClick", item)}
      >
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
          <div ref={createRefCallback("connectImageCard")}>
            <ConnectImageCard
              isLoading={state.isConnectImageCardLoading}
              isGridLoading={state.isVariantsGridLoading}
              variants={state.productVariants}
              selectedPhoto={state.selectedPhoto}
              productCounter={productsState.productCounter}
              onAction={onAction}
            />
          </div>
        )}
      </SheContextSidebar>
    </div>
  );
}
