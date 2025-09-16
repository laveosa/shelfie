import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductGalleryPageSlice } from "@/const/interfaces/store-slices/IProductGalleryPageSlice.ts";
import { ProductGalleryPageSliceActions as actions } from "@/state/slices/ProductGalleryPageSlice.ts";
import useProductGalleryPageService from "@/pages/products-section/product-gallery-page/useProductGalleryPageService.ts";
import cs from "@/pages/products-section/product-basic-data-page/ProductBasicDataPage.module.scss";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import ProductPhotosCard from "@/components/complex/custom-cards/product-photos-card/ProductPhotosCard.tsx";
import ConnectImageCard from "@/components/complex/custom-cards/connect-image-card/ConnectImageCard.tsx";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";

export function ProductGalleryPage() {
  const state = useAppSelector<IProductGalleryPageSlice>(
    StoreSliceEnum.PRODUCT_GALLERY,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const productsService = useProductsPageService();
  const { productId } = useParams();
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.PRODUCT_GALLERY].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const service = useProductGalleryPageService(handleCardAction);
  const productsForItemsCard = productsService.itemsCardItemsConvertor(
    productsState.products,
    {
      idKey: "productId",
      nameKey: "productName",
      imageKeyPath: "image.thumbnailUrl",
      type: "product",
    },
  );

  const variantsForItemsCard = productsService.itemsCardItemsConvertor(
    productsState.variants,
    {
      idKey: "variantId",
      nameKey: "variantName",
      imageKeyPath: "photo.thumbnailUrl",
      type: "variant",
    },
  );

  useEffect(() => {
    service.getProductGalleryPageDataHandler(productId);
  }, [productId]);

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

  return (
    <div className={cs.createProductPage}>
      <ItemsCard
        isLoading={productsState.isItemsCardLoading}
        isItemsLoading={
          productsState.activeTab === "products"
            ? productsState.isProductsLoading
            : productsState.isVariantsLoading
        }
        title={productsState.activeTab === "products" ? "Products" : "Variants"}
        data={
          productsState.activeTab === "products"
            ? productsForItemsCard
            : variantsForItemsCard
        }
        selectedItem={
          productsState.activeTab === "products"
            ? productId
            : productsState.selectedVariant?.variantId
        }
        skeletonQuantity={
          productsState.activeTab === "products"
            ? productsState.products?.length
            : productsState.variants?.length
        }
        onAction={productsService.itemCardHandler}
      />
      <ProductMenuCard
        isLoading={productsState.isProductMenuCardLoading}
        title={productId ? "Manage Product" : "Create Product"}
        itemsCollection="products"
        counter={productsState.productCounter}
        itemId={Number(productId)}
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
    </div>
  );
}
