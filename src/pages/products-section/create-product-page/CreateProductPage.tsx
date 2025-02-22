import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import cs from "./CreateProductPage.module.scss";
import CreateProductFormCard from "@/components/complex/custom-cards/create-product-form-card/CreateProductFormCard.tsx";
import CreateProductCategoryCard from "@/components/complex/custom-cards/create-product-category-card/CreateProductCategoryCard.tsx";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import CreateProductCard from "@/components/complex/custom-cards/create-product-card/CreateProductCard.tsx";
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
import { ICreateProductPageSlice } from "@/const/interfaces/store-slices/ICreateProductPageSlice.ts";
import { CreateProductPageSliceActions as actions } from "@/state/slices/CreateProductPageSlice.ts";

export function CreateProductPage() {
  const service = useProductsPageService();
  const dispatch = useAppDispatch();
  const state = useAppSelector<ICreateProductPageSlice>(
    StoreSliceEnum.CREATE_PRODUCT,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const sizeChartData = SizeChartFakeData;
  const navigate = useNavigate();

  useEffect(() => {
    service
      .getTheProductsForGridHandler(productsState.gridRequestModel)
      .then((res: GridModel) => {
        dispatch(actions.refreshProducts(res.items));
      });
  }, [productsState]);

  const handleAction = (identifier) => {
    const updatedCards = state.activeCards.includes(identifier)
      ? state.activeCards.filter((card) => card !== identifier)
      : [...state.activeCards, identifier];

    dispatch(actions.refreshActiveCards(updatedCards));
  };

  return (
    <div className={cs.createProductPage}>
      {state.products.length > 0 && <ItemsCard data={state.products} />}
      <CreateProductCard onAction={handleAction} />
      {state.activeCards.includes("basicData") && (
        <CreateProductFormCard
          onSecondaryButtonClick={() => navigate("/products")}
          onOpenCreateProductCategoryCard={() =>
            handleAction("openCreateProductCategoryCard")
          }
          onOpenCreateProductBrandCard={() =>
            handleAction("openCreateBrandCategoryCard")
          }
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
