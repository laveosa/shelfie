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
import { GridModel } from "@/const/models/GridModel.ts";
import ConnectImageCard from "@/components/complex/custom-cards/connect-image-card/ConnectImageCard.tsx";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { setSelectedGridItem } from "@/utils/helpers/quick-helper.ts";
import useDialogService from "@/utils/services/dialog/DialogService.ts";

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
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});
  const productsForItemsCard = productsService.itemsCardItemsConvertor(
    productsState.products,
    {
      idKey: "productId",
      nameKey: "productName",
      imageKeyPath: "image.thumbnailUrl",
      type: "product",
    },
  );

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

  function itemCardHandler(item) {
    productsService.itemCardHandler(item);
  }

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
      case "upload":
        dispatch(actions.setIsImageUploaderLoading(true));
        service.uploadPhotoHandler(payload).then((res) => {
          dispatch(actions.setIsImageUploaderLoading(false));
          if (res.data.photoId) {
            productsService
              .getProductPhotosHandler(Number(productId))
              .then((res) => {
                dispatch(productsActions.refreshProductPhotos(res));
              });
            productsService
              .getCountersForProductsHandler(productId)
              .then((res) => {
                dispatch(productsActions.refreshProductCounter(res));
              });
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
              productsService
                .getTheProductsForGridHandler(
                  productsState.gridRequestModel,
                  true,
                )
                .then((res: GridModel) => {
                  dispatch(productsActions.refreshProducts(res.items));
                });
            }
          });
        break;
      case "delete":
        const confirmed = await openConfirmationDialog({
          title: "Deleting product photo",
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
      case "openConnectImageCard":
        dispatch(actions.setIsConnectImageCardLoading(true));
        dispatch(actions.setIsVariantsGridLoading(true));
        service.getProductVariantsHandler(productId).then((res) => {
          dispatch(actions.setIsConnectImageCardLoading(false));
          dispatch(actions.setIsVariantsGridLoading(false));
          dispatch(actions.refreshProductVariants(res));
        });
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
        handleCardAction("connectImageCard", true);
        break;
      case "connectImageToVariant":
        service
          .attachProductPhotoToVariantHandler(
            payload.variantId,
            state.selectedPhoto.photoId,
          )
          .then(() => {
            productsService
              .getProductPhotosHandler(Number(productId))
              .then((res) => {
                dispatch(productsActions.refreshProductPhotos(res));

                const selectedPhoto = res.find(
                  (photo) => state.selectedPhoto.photoId === photo.photoId,
                );
                dispatch(
                  productsActions.refreshProductPhotos(
                    setSelectedGridItem(
                      state.selectedPhoto.photoId,
                      productsState.productPhotos,
                      "photoId",
                    ),
                  ),
                );
                dispatch(actions.refreshSelectedPhoto(selectedPhoto));
              });
          });
        break;
      case "detachImageFromVariant":
        service
          .detachVariantPhotoHandler(
            payload.variantId,
            state.selectedPhoto.photoId,
          )
          .then(() => {
            productsService
              .getProductPhotosHandler(Number(productId))
              .then((res) => {
                dispatch(productsActions.refreshProductPhotos(res));

                const selectedPhoto = res.find(
                  (photo) => state.selectedPhoto.photoId === photo.photoId,
                );
                dispatch(
                  productsActions.refreshProductPhotos(
                    setSelectedGridItem(
                      state.selectedPhoto.photoId,
                      productsState.productPhotos,
                      "photoId",
                    ),
                  ),
                );
                dispatch(actions.refreshSelectedPhoto(selectedPhoto));
              });
          });
        break;
    }
  }

  return (
    <div className={cs.createProductPage}>
      <div className={cs.borderlessCards}>
        <ItemsCard
          isLoading={productsState.isItemsCardLoading}
          isItemsLoading={productsState.isProductsLoading}
          title="Products"
          data={productsForItemsCard}
          selectedItem={productId}
          skeletonQuantity={productsState.products?.length}
          onAction={itemCardHandler}
        />
        <ProductMenuCard
          isLoading={productsState.isProductMenuCardLoading}
          title={productId ? "Manage Product" : "Create Product"}
          itemsCollection="products"
          productCounter={productsState.productCounter}
          productId={Number(productId)}
          activeCards={state.activeCards}
        />
      </div>
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
