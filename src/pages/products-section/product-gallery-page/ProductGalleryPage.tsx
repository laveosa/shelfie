import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductGalleryPageSlice } from "@/const/interfaces/store-slices/IProductGalleryPageSlice.ts";
import React, { useEffect } from "react";
import { ProductBasicDataPageSliceActions as actions } from "@/state/slices/ProductBasicDataPageSlice.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import useProductGalleryPageService from "@/pages/products-section/product-gallery-page/useProductGalleryPageService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import useProductBasicDataPageService from "@/pages/products-section/product-basic-data-page/useProductBasicDataPageService.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";
import { useToast } from "@/hooks/useToast.ts";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import cs from "@/pages/products-section/product-basic-data-page/ProductBasicDataPage.module.scss";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import ProductPhotosCard from "@/components/complex/custom-cards/product-photos-card/ProductPhotosCard.tsx";
import { GridModel } from "@/const/models/GridModel.ts";

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
  const productBasicDataService = useProductBasicDataPageService();
  const { productId } = useParams();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    productsService
      .getTheProductsForGridHandler(productsState.gridRequestModel)
      .then((res: GridModel) => {
        dispatch(actions.refreshProducts(res.items));
      });

    if (productId) {
      productBasicDataService
        .getProductByIdHandler(productId)
        .then((res: ProductModel) => {
          dispatch(actions.refreshProduct(res));
        });

      productBasicDataService
        .getCountersForProductsHandler(productId)
        .then((res: ProductCounterModel) => {
          dispatch(actions.refreshProductCounter(res));
        });

      service.getProductPhotosHandler(Number(productId)).then((res) => {
        dispatch(actions.refreshProductPhotos(res));
      });
    } else {
      dispatch(actions.refreshProductCounter({}));
      dispatch(actions.refreshProduct({}));
    }

    return () => {
      dispatch(actions.refreshActiveCards([])); // Clear active cards when leaving the page
    };
  }, [productId]);

  function itemCardHandler(item) {
    navigate(
      `${ApiUrlEnum.PRODUCTS}${ApiUrlEnum.PRODUCT_BASIC_DATA}/${item.productId}`,
    );
  }

  function closeCardHandler(identifier) {
    const updatedCards = state.activeCards.filter(
      (card) => card !== identifier,
    );
    dispatch(actions.refreshActiveCards(updatedCards));
  }

  function onFileUploadHandler(uploadModel: UploadPhotoModel) {
    service.uploadPhotoHandler(uploadModel).then((res) => {
      if (!uploadModel.contextId) {
        addToast({
          text: "Create category first",
          type: "error",
        });
      } else {
        if (res.data.photoId) {
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
  }

  return (
    <div className={cs.createProductPage}>
      {state.products?.length > 0 && (
        <ItemsCard
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
        onSecondaryButtonClick={() => closeCardHandler("gallery")}
        data={state.products}
        contextId={productId}
        onFileUpload={onFileUploadHandler}
      />
    </div>
  );
}
