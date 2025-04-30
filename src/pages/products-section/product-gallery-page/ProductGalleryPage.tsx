import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductGalleryPageSlice } from "@/const/interfaces/store-slices/IProductGalleryPageSlice.ts";
import { ProductGalleryPageSliceActions as actions } from "@/state/slices/ProductGalleryPageSlice.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import useProductGalleryPageService from "@/pages/products-section/product-gallery-page/useProductGalleryPageService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import cs from "@/pages/products-section/product-basic-data-page/ProductBasicDataPage.module.scss";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import ProductPhotosCard from "@/components/complex/custom-cards/product-photos-card/ProductPhotosCard.tsx";
import { GridModel } from "@/const/models/GridModel.ts";
import ConnectImageCard from "@/components/complex/custom-cards/connect-image-card/ConnectImageCard.tsx";

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
  const navigate = useNavigate();
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    productsService
      .getTheProductsForGridHandler(productsState.gridRequestModel)
      .then((res: GridModel) => {
        dispatch(actions.refreshProducts(res.items));
      });

    service
      .getCountersForProductsHandler(productId)
      .then((res: ProductCounterModel) => {
        dispatch(actions.refreshProductCounter(res));
      });

    service.getProductPhotosHandler(Number(productId)).then((res) => {
      dispatch(actions.refreshProductPhotos(res));
    });
  }, []);

  function itemCardHandler(item) {
    navigate(
      `${ApiUrlEnum.PRODUCTS}${ApiUrlEnum.PRODUCT_BASIC_DATA}/${item.productId}`,
    );
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
          if (!payload.contextId) {
            addToast({
              text: "Create category first",
              type: "error",
            });
          } else {
            if (res.data.photoId) {
              service.getProductPhotosHandler(Number(productId)).then((res) => {
                dispatch(actions.refreshProductPhotos(res));
              });
              service.getCountersForProductsHandler(productId).then((res) => {
                dispatch(actions.refreshProductCounter(res));
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
          }
        });
        break;
      case "dnd":
        service
          .putPhotoInNewPositionHandler(
            productId,
            payload.activeItem.photoId,
            payload.newIndex,
          )
          .then(() => {
            productsService
              .getTheProductsForGridHandler(productsState.gridRequestModel)
              .then((res: GridModel) => {
                dispatch(actions.refreshProducts(res.items));
              });
          });
        break;
      case "delete":
        service.deletePhotoHandler(payload.photoId).then(() => {
          service.getProductPhotosHandler(Number(productId)).then((res) => {
            dispatch(actions.refreshProductPhotos(res));
          });
          service
            .getCountersForProductsHandler(productId)
            .then((res: ProductCounterModel) => {
              dispatch(actions.refreshProductCounter(res));
            });
          productsService
            .getTheProductsForGridHandler(productsState.gridRequestModel)
            .then((res: GridModel) => {
              dispatch(actions.refreshProducts(res.items));
            });
        });
        break;
      case "openConnectImageCard":
        service.getProductVariantsHandler(productId).then((res) => {
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
            service.getProductPhotosHandler(Number(productId)).then((res) => {
              dispatch(actions.refreshProductPhotos(res));

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
      {state.products?.length > 0 && (
        <ItemsCard
          title="Products"
          data={state.products}
          selectedItem={productId}
          onAction={itemCardHandler}
        />
      )}
      <ProductMenuCard
        title={productId ? "Manage Product" : "Create Product"}
        productCounter={state.productCounter}
        productId={Number(productId)}
        activeCards={state.activeCards}
      />
      <ProductPhotosCard
        width={"400px"}
        data={state.photos}
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
