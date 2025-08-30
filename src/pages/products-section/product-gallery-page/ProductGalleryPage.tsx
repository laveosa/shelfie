import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductGalleryPageSlice } from "@/const/interfaces/store-slices/IProductGalleryPageSlice.ts";
import { ProductGalleryPageSliceActions as actions } from "@/state/slices/ProductGalleryPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice";
import useProductGalleryPageService from "@/pages/products-section/product-gallery-page/useProductGalleryPageService.ts";
import { useToast } from "@/hooks/useToast.ts";
import cs from "@/pages/products-section/product-basic-data-page/ProductBasicDataPage.module.scss";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import ProductPhotosCard from "@/components/complex/custom-cards/product-photos-card/ProductPhotosCard.tsx";
import ConnectImageCard from "@/components/complex/custom-cards/connect-image-card/ConnectImageCard.tsx";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { setSelectedGridItem } from "@/utils/helpers/quick-helper.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";

export function ProductGalleryPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<IProductGalleryPageSlice>(
    StoreSliceEnum.PRODUCT_GALLERY,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const service = useProductGalleryPageService();
  const productsService = useProductsPageService();
  const { productId } = useParams();
  const { addToast } = useToast();
  const { openConfirmationDialog } = useDialogService();
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.PRODUCT_GALLERY].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
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
    if (productsState.products === null) {
      dispatch(productsActions.setIsItemsCardLoading(true));
      productsService
        .getTheProductsForGridHandler(productsState.gridRequestModel)
        .then(() => {
          dispatch(productsActions.setIsItemsCardLoading(false));
        });
    }
    if (!productsState.productCounter) {
      dispatch(productsActions.setIsProductMenuCardLoading(true));
      productsService.getCountersForProductsHandler(productId).then(() => {
        dispatch(productsActions.setIsProductMenuCardLoading(false));
      });
    }
    dispatch(actions.setIsProductPhotosCardLoading(true));
    productsService.getProductPhotosHandler(Number(productId)).then(() => {
      dispatch(actions.setIsProductPhotosCardLoading(false));
    });
    service.getProductVariantsHandler(Number(productId));
  }, [productId]);

  function itemCardHandler(item) {
    productsService.itemCardHandler(item);
  }

  async function onAction(actionType: string, payload: any) {
    switch (actionType) {
      case "uploadPhoto":
        dispatch(actions.setIsImageUploaderLoading(true));
        service.uploadPhotoHandler(payload).then((res) => {
          dispatch(actions.setIsImageUploaderLoading(false));
          if (res.data.photoId) {
            productsService
              .getProductPhotosHandler(Number(productId))
              .then((res) => {
                dispatch(productsActions.refreshProductPhotos(res));
              });
            productsService.getCountersForProductsHandler(productId);
            addToast({
              text: "Photos added successfully",
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
      case "changePhotoPosition":
        service
          .putPhotoInNewPositionHandler(
            productId,
            payload.activeItem.photoId,
            payload.newIndex,
          )
          .then(() => {
            if (payload.newIndex === 0 || payload.oldIndex === 0) {
              productsService.getTheProductsForGridHandler(
                productsState.gridRequestModel,
                true,
              );
            }
          });
        break;
      case "deletePhoto":
        const confirmed = await openConfirmationDialog({
          headerTitle: "Deleting product photo",
          text: "You are about to delete product photo.",
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmed) return;

        dispatch(productsActions.setIsProductPhotosLoading(true));

        try {
          await service.deletePhotoHandler(payload.photoId);

          const [productPhotos, counters, photos] = await Promise.all([
            productsService.getProductPhotosHandler(Number(productId)),
            productsService.getCountersForProductsHandler(productId),
            payload.id === 1
              ? productsService.getTheProductsForGridHandler(
                  productsState.gridRequestModel,
                  true,
                )
              : Promise.resolve({ items: [] }),
          ]);

          queueMicrotask(() => {
            dispatch(productsActions.refreshProductPhotos(productPhotos));
            dispatch(productsActions.refreshProductCounter(counters));

            if (payload.id === 1) {
              dispatch(productsActions.refreshProducts(photos.items));
            }
          });

          addToast({
            text: "Photo deleted successfully",
            type: "success",
          });
        } catch (error: any) {
          addToast({
            text: "Photo not deleted",
            description: error.message,
            type: "error",
          });
        } finally {
          dispatch(productsActions.setIsProductPhotosLoading(false));
        }
        break;
      case "activatePhoto":
        service
          .setPhotoActivationStateHandler(
            "Product",
            Number(productId),
            payload.photoId,
            { isActive: !payload.isActive },
          )
          .then((res) => {
            if (!res.error) {
              dispatch(
                productsActions.refreshProductPhotos(
                  productsState.productPhotos.map((photo) =>
                    photo.photoId === payload.photoId
                      ? { ...photo, isActive: !payload.isActive }
                      : photo,
                  ),
                ),
              );
            }
          });
        break;
      case "openConnectImageCard":
        dispatch(
          productsActions.refreshProductPhotos(
            setSelectedGridItem(
              payload.photoId,
              productsState.productPhotos,
              "photoId",
            ),
          ),
        );
        dispatch(actions.refreshSelectedPhoto(payload));
        dispatch(
          actions.refreshProductVariants(
            state.productVariants.map((variant) => {
              const isInSelectedPhoto = payload.variants?.some(
                (photoVariant) => photoVariant.variantId === variant.variantId,
              );

              return {
                ...variant,
                isActive: isInSelectedPhoto,
              };
            }),
          ),
        );
        handleCardAction("connectImageCard", true);
        break;
      case "connectImageToVariant":
        productsService
          .attachProductPhotoToVariantHandler(
            payload.variantId,
            state.selectedPhoto.photoId,
          )
          .then((res) => {
            if (!res.error) {
              const updatedVariants = state.productVariants.map((variant) => {
                if (variant.variantId === payload.variantId) {
                  return {
                    ...variant,
                    isActive: true,
                  };
                }
                return variant;
              });
              dispatch(actions.refreshProductVariants(updatedVariants));
            }
          });
        break;
      case "detachImageFromVariant":
        productsService
          .detachVariantPhotoHandler(
            payload.variantId,
            state.selectedPhoto.photoId,
          )
          .then((res) => {
            if (!res.error) {
              const updatedVariants = state.productVariants.map((variant) => {
                if (variant.variantId === payload.variantId) {
                  return {
                    ...variant,
                    isActive: false,
                  };
                }
                return variant;
              });
              dispatch(actions.refreshProductVariants(updatedVariants));
            }
          });
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
        onAction={itemCardHandler}
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
            onSecondaryButtonClick={() => handleCardAction("connectImageCard")}
          />
        </div>
      )}
    </div>
  );
}
