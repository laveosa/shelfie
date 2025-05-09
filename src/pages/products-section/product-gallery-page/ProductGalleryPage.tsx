import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductGalleryPageSlice } from "@/const/interfaces/store-slices/IProductGalleryPageSlice.ts";
import { ProductGalleryPageSliceActions as actions } from "@/state/slices/ProductGalleryPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
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
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (productsState.products === null) {
      productsService
        .getTheProductsForGridHandler(productsState.gridRequestModel)
        .then((res) => {
          if (res) {
            dispatch(productsActions.refreshProducts(res.items));
          }
        });
    }
    if (!productsState.productCounter) {
      productsService.getCountersForProductsHandler(productId).then((res) => {
        if (res) {
          dispatch(productsActions.refreshProductCounter(res));
        }
      });
    }
    if (productsState.productPhotos.length === 0) {
      productsService.getProductPhotosHandler(Number(productId)).then((res) => {
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

  function handleCardAction(identifier: string) {
    const updatedCards = state.activeCards.includes(identifier)
      ? state.activeCards.filter((card) => card !== identifier)
      : [...state.activeCards, identifier];
    scrollToCard(identifier);
    dispatch(actions.refreshActiveCards(updatedCards));
  }

  function onAction(actionType: string, payload: any) {
    switch (actionType) {
      case "upload":
        service.uploadPhotoHandler(payload).then((res) => {
          if (res.data.photoId) {
            dispatch(productsActions.setIsProductPhotosLoading(true));
            productsService
              .getProductPhotosHandler(Number(productId))
              .then((res) => {
                dispatch(productsActions.setIsProductPhotosLoading(false));
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
            if (payload.newIndex === 0) {
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
        dispatch(productsActions.setIsProductPhotosLoading(true));
        service.deletePhotoHandler(payload.photoId).then(() => {
          productsService
            .getProductPhotosHandler(Number(productId))
            .then((res) => {
              dispatch(productsActions.setIsProductPhotosLoading(false));
              dispatch(productsActions.refreshProductPhotos(res));
            });
          productsService
            .getCountersForProductsHandler(productId)
            .then((res: ProductCounterModel) => {
              dispatch(productsActions.refreshProductCounter(res));
            });
          productsService
            .getTheProductsForGridHandler(productsState.gridRequestModel)
            .then((res: GridModel) => {
              dispatch(productsActions.refreshProducts(res.items));
            });
        });
        break;
      case "openConnectImageCard":
        dispatch(actions.setIsVariantsGridLoading(true));
        service.getProductVariantsHandler(productId).then((res) => {
          dispatch(actions.setIsVariantsGridLoading(false));
          dispatch(actions.refreshProductVariants(res));
        });
        dispatch(actions.refreshSelectedPhoto(payload));
        handleCardAction("connectImageCard");
        break;
      case "connectImageToVariant":
        service
          .attachProductPhotoToVariantHandler(
            payload.variantId,
            state.selectedPhoto.photoId,
          )
          .then(() => {
            service.getProductVariantsHandler(productId).then((res) => {
              dispatch(actions.refreshProductVariants(res));
            });
            productsService
              .getProductPhotosHandler(Number(productId))
              .then((res) => {
                dispatch(productsActions.refreshProductPhotos(res));

                const selectedPhoto = res.find(
                  (photo) => state.selectedPhoto.photoId === photo.photoId,
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
          isLoading={productsState.isProductsLoading}
          title="Products"
          data={productsState.products}
          selectedItem={productId}
          onAction={itemCardHandler}
        />
        <ProductMenuCard
          title={productId ? "Manage Product" : "Create Product"}
          productCounter={productsState.productCounter}
          productId={Number(productId)}
          activeCards={state.activeCards}
        />
      </div>
      <ProductPhotosCard
        isLoading={productsState.isProductPhotosLoading}
        width={"400px"}
        data={productsState.productPhotos}
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
            isGridLoading={state.isVariantsGridLoading}
            variants={state.productVariants}
            selectedPhoto={state.selectedPhoto}
            onAction={onAction}
            onSecondaryButtonClick={() => handleCardAction("connectImageCard")}
          />
        </div>
      )}
    </div>
  );
}
