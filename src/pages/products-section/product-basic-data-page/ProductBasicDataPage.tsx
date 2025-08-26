import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./ProductBasicDataPage.module.scss";
import ProductConfigurationCard from "@/components/complex/custom-cards/product-configuration-card/ProductConfigurationCard.tsx";
import CreateProductCategoryCard from "@/components/complex/custom-cards/create-product-category-card/CreateProductCategoryCard.tsx";
import ItemsCard from "@/components/complex/custom-cards/items-card/ItemsCard.tsx";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import CreateProductBrandCard from "@/components/complex/custom-cards/create-product-brand-card/CreateProductBrandCard.tsx";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductBasicDataPageSlice } from "@/const/interfaces/store-slices/IProductBasicDataPageSlice.ts";
import { ProductBasicDataPageSliceActions as actions } from "@/state/slices/ProductBasicDataPageSlice.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import useProductBasicDataPageService from "@/pages/products-section/product-basic-data-page/useProductBasicDataPageService.ts";

export function ProductBasicDataPage() {
  const state = useAppSelector<IProductBasicDataPageSlice>(
    StoreSliceEnum.PRODUCT_BASIC_DATA,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const service = useProductBasicDataPageService();
  const productsService = useProductsPageService();
  const { productId } = useParams();
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.PRODUCT_BASIC_DATA].activeCards,
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
    service.getProductsHandler(productsState.gridRequestModel);
    service.getCategoriesHandler();
    service.getBrandsHandler();
    service.getCountersForProductsHandler(Number(productId));
    service.getProductDetailsHandler(Number(productId));
  }, [productId]);

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "itemCardClick":
        service.itemCardClickHandler(payload);
        break;
      case "submitProductData":
        service.onSubmitProductDataHandler(productId, payload);
        break;
      case "checkCategoryName":
        service.checkCategoryNameHandler(payload);
        break;
      case "createProductCategory":
        service.createNewCategoryHandler();
        break;
      case "checkBrandName":
        service.checkBrandNameHandler(payload);
        break;
      case "createProductBrand":
        service.createBrandHandler();
        break;
      case "uploadCategoryOrBrandPhoto":
        service.uploadCategoryOrBrandPhotoHandler(payload);
        break;
      case "gotoProductsPage":
        service.gotoProductsPageHandler();
        break;
      case "generateProductCode":
        service.generateProductCodeHandler();
        break;
      case "checkProductCode":
        service.checkProductCodeHandler(payload);
        break;
      case "openCreateProductCategoryCard":
        handleCardAction("createCategoryCard", true);
        break;
      case "openCreateProductBrandCard":
        handleCardAction("createBrandCard", true);
        break;
      case "closeCreateProductCategoryCard":
        handleCardAction("createCategoryCard");
        break;
      case "closeCreateProductBrandCard":
        handleCardAction("createBrandCard");
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
        onAction={(item) => onAction("itemsCardClick", item)}
      />
      <ProductMenuCard
        isLoading={productsState.isProductMenuCardLoading}
        title={productId ? "Manage Product" : "Create Product"}
        itemsCollection="products"
        counter={productsState.productCounter}
        itemId={Number(productId)}
        activeCards={state.activeCards}
      />
      <ProductConfigurationCard
        isLoading={state.isProductConfigurationCardLoading}
        product={productsState.product}
        brandsList={productsState.brands}
        categoriesList={productsState.categories}
        productCode={productsState.productCode}
        onPrimaryButtonClick={(data) => onAction("submitProductData", data)}
        onSecondaryButtonClick={() => onAction("gotoProductsPage")}
        onAction={onAction}
      />
      {state.activeCards.includes("createCategoryCard") && (
        <div ref={createRefCallback("createCategoryCard")}>
          <CreateProductCategoryCard
            isLoading={state.isCreateCategoryCardLoading}
            category={productsState.category}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards.includes("createBrandCard") && (
        <div ref={createRefCallback("createBrandCard")}>
          <CreateProductBrandCard
            isLoading={state.isCreateBrandCardLoading}
            brand={productsState.brand}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
