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

export function ProductConfigurationPage() {
  const productsService = useProductsPageService();
  const service = useProductConfigurationPageService();
  const dispatch = useAppDispatch();
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
  }, [productsState]);

  useEffect(() => {
    service.getSimpleListOfAllBrandsHandler().then((res: BrandModel[]) => {
      dispatch(actions.refreshBrandsList(res ? res : []));
    });

    service
      .getAllCategoriesByOrganizationHandler()
      .then((res: CategoryModel[]) => {
        dispatch(actions.refreshCategoriesList(res ? res : []));
      });

    if (productId) {
      service.getProductByIdHandler(productId).then((res: ProductModel) => {
        dispatch(actions.refreshProduct(res));
      });

      service
        .getCountersForProductsHandler(productId)
        .then((res: ProductCounterModel) => {
          dispatch(actions.refreshProductCounter(res));
        });
    } else {
      dispatch(actions.refreshProductCounter({}));
      dispatch(actions.refreshProduct({}));
    }
  }, [productId]);

  function handleAction(identifier) {
    const updatedCards = state.activeCards.includes(identifier)
      ? state.activeCards.filter((card) => card !== identifier)
      : [...state.activeCards, identifier];

    dispatch(actions.refreshActiveCards(updatedCards));
  }

  function handleCloseProductConfigurationCard() {
    if (productId) {
      handleAction("basicData");
    } else {
      navigate("/products");
    }
  }

  function onSubmitProductData(data: any) {
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

  return (
    <div className={cs.createProductPage}>
      {state.products.length > 0 && <ItemsCard data={state.products} />}
      <ProductMenuCard
        title={productId ? "Manage Product" : "Create Product"}
        productCounter={state.productCounter}
        onAction={handleAction}
        productId={Number(productId)}
      />
      {state.activeCards.includes("basicData") && (
        <ProductConfigurationCard
          product={state.product}
          brandsList={state.brandsList}
          categoriesList={state.categoriesList}
          onGenerateProductCode={service.generateProductCodeHandler}
          onProductCodeChange={service.checkProductCodeHandler}
          onOpenCreateProductCategoryCard={() =>
            handleAction("openCreateProductCategoryCard")
          }
          onOpenCreateProductBrandCard={() =>
            handleAction("openCreateBrandCategoryCard")
          }
          onSecondaryButtonClick={handleCloseProductConfigurationCard}
          onPrimaryButtonClick={(data) => onSubmitProductData(data)}
        />
      )}
      {state.activeCards.includes("gallery") && (
        <ProductPhotosCard
          width={"400px"}
          onSecondaryButtonClick={() => handleAction("gallery")}
          data={state.products}
        />
      )}
      {state.activeCards.includes("variants") && (
        <ManageVariantsCard
          onChooseVariantTraits={() =>
            handleAction("openChooseVariantTraitsCard")
          }
        />
      )}
      {state.activeCards.includes("sizeChart") && (
        <SizeChartCard
          data={sizeChartData}
          onOpenCreateProductCategoryCard={() =>
            handleAction("openCreateProductCategoryCard")
          }
          onSecondaryButtonClick={() => handleAction("sizeChart")}
        />
      )}
      {state.activeCards.includes("attributes") && (
        <ChooseAttributesCard
          onCreateAttributeHandle={() => {
            handleAction("createAttributeCard");
          }}
          onSecondaryButtonClick={() => handleAction("attributes")}
        />
      )}
      {state.activeCards.includes("createAttributeCard") && (
        <CreateAttributeCard
          data={state.products}
          onSecondaryButtonClick={() => handleAction("createAttributeCard")}
        />
      )}
      {state.activeCards.includes("openCreateProductCategoryCard") && (
        <CreateProductCategoryCard
          onSecondaryButtonClick={() =>
            handleAction("openCreateProductCategoryCard")
          }
        />
      )}
      {state.activeCards.includes("openCreateBrandCategoryCard") && (
        <CreateProductBrandCard
          onSecondaryButtonClick={() =>
            handleAction("openCreateBrandCategoryCard")
          }
        />
      )}
      {state.activeCards.includes("openChooseVariantTraitsCard") && (
        <ChooseVariantTraitsCard />
      )}
    </div>
  );
}
