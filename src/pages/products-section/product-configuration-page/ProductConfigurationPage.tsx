import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import cs from "./ProductConfigurationPage.module.scss";
import ProductConfigurationCard from "@/components/complex/custom-cards/product-configuration-card/ProductConfigurationCard.tsx";
import CreateProductCategoryCard from "@/components/complex/custom-cards/create-product-category-card/CreateProductCategoryCard.tsx";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import CreateProductBrandCard from "@/components/complex/custom-cards/create-product-brand-card/CreateProductBrandCard.tsx";
import ProductPhotosCard from "@/components/complex/custom-cards/product-photos-card/ProductPhotosCard.tsx";
import SizeChartCard from "@/components/complex/custom-cards/size-chart-card/SizeChartCard.tsx";
import { SizeChartFakeData } from "@/components/complex/grid/size-chart-grid/SizeChartFakeData.ts";
import ChooseAttributesCard from "@/components/complex/custom-cards/choose-attributes-card/ChooseAttributesCard.tsx";
import CreateAttributeCard from "@/components/complex/custom-cards/create-attribute-card/CreateAttributeCard.tsx";
import ManageVariantsCard from "@/components/complex/custom-cards/manage-variants-card/ManageVariantsCard.tsx";
import ChooseVariantTraitsCard from "@/components/complex/custom-cards/choose-variant-traits-card/ChooseVariantTraitsCard.tsx";

import { GridModel } from "@/const/models/GridModel.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductConfigurationPageSlice } from "@/const/interfaces/store-slices/IProductConfigurationPageSlice.ts";
import { ProductConfigurationPageSliceActions as actions } from "@/state/slices/ProductConfigurationPageSlice.ts";
import useProductConfigurationPageService from "@/pages/products-section/product-configuration-page/useProductConfigurationPageService.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import { useToast } from "@/hooks/useToast.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { UploadPhotoModel } from "@/const/models/UploadPhotoModel.ts";

export function ProductConfigurationPage() {
  const dispatch = useAppDispatch();
  const productsService = useProductsPageService();
  const service = useProductConfigurationPageService();
  const state = useAppSelector<IProductConfigurationPageSlice>(
    StoreSliceEnum.PRODUCT_CONFIGURATION,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const sizeChartData = SizeChartFakeData;
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { productId } = useParams();

  useEffect(() => {
    productsService
      .getTheProductsForGridHandler(productsState.gridRequestModel)
      .then((res: GridModel) => {
        dispatch(actions.refreshProducts(res.items));
      });

    service.getSimpleListOfAllBrandsHandler().then((res: BrandModel[]) => {
      dispatch(actions.refreshBrandsList(res ? res : []));
    });

    service
      .getAllCategoriesByOrganizationHandler()
      .then((res: CategoryModel[]) => {
        dispatch(actions.refreshCategoriesList(res ? res : []));
      });

    dispatch(actions.refreshActiveCards(["basicData"]));

    if (productId) {
      dispatch(actions.refreshActiveCards(["basicData"]));
      service.getProductDetailsHandler(productId).then((res: ProductModel) => {
        dispatch(actions.refreshProduct(res));
      });

      service
        .getCountersForProductsHandler(productId)
        .then((res: ProductCounterModel) => {
          dispatch(actions.refreshProductCounter(res));
        });

      service.getProductPhotosHandler(productId).then((res) => {
        dispatch(actions.refreshProductPhotos(res));
      });
    } else {
      dispatch(actions.refreshProductCounter({}));
      dispatch(actions.refreshProduct({}));
    }

    return () => {
      dispatch(actions.refreshActiveCards([]));
    };
  }, [productId]);

  function handleCardAction(identifier: string) {
    const cardGroups = {
      basicData: ["basicData", "createCategoryCard", "createBrandCard"],
      gallery: ["gallery"],
      variants: ["variants", "chooseVariantTraitsCard"],
      sizeChart: ["sizeChart", "createSizeChartCategoryCard"],
      attributes: ["attributes", "createAttributeCard"],
    };

    const groupToClose = Object.keys(cardGroups).find((group) =>
      cardGroups[group].includes(identifier),
    );

    if (groupToClose) {
      const updatedCards = state.activeCards.filter((card) =>
        cardGroups[groupToClose].includes(card),
      );
      updatedCards.push(identifier);
      dispatch(actions.refreshActiveCards(updatedCards));
    } else {
      const updatedCards = state.activeCards.includes(identifier)
        ? state.activeCards.filter((card) => card !== identifier)
        : [...state.activeCards, identifier];

      dispatch(actions.refreshActiveCards(updatedCards));
    }
  }

  function closeCardHandler(identifier) {
    const updatedCards = state.activeCards.filter(
      (card) => card !== identifier,
    );
    dispatch(actions.refreshActiveCards(updatedCards));
  }

  function closeProductConfigurationCardHandle() {
    if (productId) {
      closeCardHandler("basicData");
    } else {
      navigate("/products");
    }
  }

  function itemCardHandler(item) {
    navigate(`/products/product-configuration/${item.productId}`);
  }

  function onSubmitProductDataHandler(data: any) {
    service.createNewProductHandler(data).then((res) => {
      if (res.data) {
        dispatch(actions.refreshProduct(res.data));
        productsService
          .getTheProductsForGridHandler(productsState.gridRequestModel)
          .then((res: GridModel) => {
            dispatch(productsActions.refreshProductsGridModel(res));
          });
        navigate(`/products/product-configuration/${res.data.productId}`);
        addToast({
          text: "Product created successfully",
          type: "success",
        });
      } else {
        addToast({
          text: `${res.error.data.detail}`,
          type: "error",
        });
      }
    });
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

  function onDndItem(newIndex, activeItem) {
    service.putPhotoInNewPositionHandler(
      productId,
      activeItem.photoId,
      newIndex,
    );
  }

  function onDeleteItem(data) {
    service.deletePhotoHandler(data.photoId).then(() => {
      service.getProductPhotosHandler(productId).then((res) => {
        dispatch(actions.refreshProductPhotos(res));
      });
      service
        .getCountersForProductsHandler(productId)
        .then((res: ProductCounterModel) => {
          dispatch(actions.refreshProductCounter(res));
        });
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
        onAction={handleCardAction}
        productId={Number(productId)}
        activeCards={state.activeCards}
      />
      {state.activeCards.includes("basicData") && (
        <ProductConfigurationCard
          product={state.product}
          brandsList={state.brandsList}
          categoriesList={state.categoriesList}
          onGenerateProductCode={service.generateProductCodeHandler}
          onProductCodeChange={service.checkProductCodeHandler}
          onOpenCreateProductCategoryCard={() =>
            handleCardAction("createCategoryCard")
          }
          onOpenCreateProductBrandCard={() =>
            handleCardAction("createBrandCard")
          }
          onSecondaryButtonClick={closeProductConfigurationCardHandle}
          onPrimaryButtonClick={(data) => onSubmitProductDataHandler(data)}
        />
      )}
      {state.activeCards.includes("gallery") && (
        <ProductPhotosCard
          width={"400px"}
          onSecondaryButtonClick={() => closeCardHandler("gallery")}
          data={state.products}
          contextId={productId}
          onFileUpload={onFileUploadHandler}
          onDndItem={onDndItem}
          onDeleteItem={onDeleteItem}
        />
      )}
      {state.activeCards.includes("variants") && (
        <ManageVariantsCard
          onChooseVariantTraits={() =>
            handleCardAction("chooseVariantTraitsCard")
          }
          onSecondaryButtonClick={() => closeCardHandler("variants")}
        />
      )}
      {state.activeCards.includes("sizeChart") && (
        <SizeChartCard
          data={sizeChartData}
          onOpenCreateProductCategoryCard={() =>
            handleCardAction("createSizeChartCategoryCard")
          }
          onSecondaryButtonClick={() => closeCardHandler("sizeChart")}
        />
      )}
      {state.activeCards.includes("attributes") && (
        <ChooseAttributesCard
          onCreateAttributeHandle={() => {
            handleCardAction("createAttributeCard");
          }}
          onSecondaryButtonClick={() => closeCardHandler("attributes")}
        />
      )}
      {state.activeCards.includes("createAttributeCard") && (
        <CreateAttributeCard
          data={state.products}
          onSecondaryButtonClick={() => closeCardHandler("createAttributeCard")}
        />
      )}
      {state.activeCards.includes("createCategoryCard") && (
        <CreateProductCategoryCard
          onSecondaryButtonClick={() => closeCardHandler("createCategoryCard")}
        />
      )}
      {state.activeCards.includes("createSizeChartCategoryCard") && (
        <CreateProductCategoryCard
          onSecondaryButtonClick={() =>
            closeCardHandler("createSizeChartCategoryCard")
          }
        />
      )}
      {state.activeCards.includes("createBrandCard") && (
        <CreateProductBrandCard
          onSecondaryButtonClick={() => closeCardHandler("createBrandCard")}
        />
      )}
      {state.activeCards.includes("chooseVariantTraitsCard") && (
        <ChooseVariantTraitsCard
          onSecondaryButtonClick={() =>
            closeCardHandler("chooseVariantTraitsCard")
          }
        />
      )}
    </div>
  );
}
