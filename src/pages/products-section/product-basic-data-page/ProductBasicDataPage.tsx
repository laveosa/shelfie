import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./ProductBasicDataPage.module.scss";
import ProductConfigurationCard from "@/components/complex/custom-cards/product-configuration-card/ProductConfigurationCard.tsx";
import CreateProductCategoryCard from "@/components/complex/custom-cards/create-product-category-card/CreateProductCategoryCard.tsx";
import CreateProductBrandCard from "@/components/complex/custom-cards/create-product-brand-card/CreateProductBrandCard.tsx";
import { ProductBasicDataPageSliceActions as actions } from "@/state/slices/ProductBasicDataPageSlice.ts";
import useProductBasicDataPageService from "@/pages/products-section/product-basic-data-page/useProductBasicDataPageService.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";

export function ProductBasicDataPage() {
  // ==================================================================== UTILITIES
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.PRODUCT_BASIC_DATA].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const { state, productsState, productsService, ...service } =
    useProductBasicDataPageService(handleCardAction);
  const { productId } = useParams();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getProductsHandler(productsState.productsGridRequestModel);
    service.getCategoriesHandler();
    service.getBrandsHandler();
    service.getCountersForProductsHandler(Number(productId));
    service.getProductDetailsHandler(Number(productId));
  }, [productId]);

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "itemsCardClick":
        service.itemCardClickHandler(payload);
        break;
      case "submitProductData":
        service.onSubmitProductDataHandler(productId, payload);
        break;
      case "checkCategoryName":
        service.checkCategoryNameHandler(payload);
        break;
      case "createProductCategory":
        service.createNewCategoryHandler(payload);
        break;
      case "checkBrandName":
        service.checkBrandNameHandler(payload);
        break;
      case "createProductBrand":
        service.createBrandHandler(payload);
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

  // ==================================================================== LAYOUT
  return (
    <div className={cs.productBasicDataPage}>
      <SheContextSidebar
        isListLoading={productsState.isItemsCardLoading}
        isMenuLoading={productsState.isProductMenuCardLoading}
        listItems={productsState[productsState.activeTab]}
        selectedId={
          productsState.activeTab === "products"
            ? productId
            : productsState.selectedVariant?.variantId
        }
        skeletonQuantity={
          productsState.activeTab === "products"
            ? productsState.products?.length
            : productsState.variants?.length
        }
        activeTab={productsState.activeTab}
        menuCollectionType="products"
        counter={productsState.productCounter}
        itemId={Number(productId)}
        activeCards={state.activeCards}
        onAction={(item) => onAction("itemsCardClick", item)}
      >
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
              isPhotoUploaderLoading={productsState.isPhotoUploaderLoading}
              category={productsState.category}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("createBrandCard") && (
          <div ref={createRefCallback("createBrandCard")}>
            <CreateProductBrandCard
              isLoading={state.isCreateBrandCardLoading}
              isPhotoUploaderLoading={productsState.isPhotoUploaderLoading}
              brand={productsState.brand}
              onAction={onAction}
            />
          </div>
        )}
      </SheContextSidebar>
    </div>
  );

  /*return (
    <div className={cs.productBasicDataPage}>
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
            isPhotoUploaderLoading={productsState.isPhotoUploaderLoading}
            category={productsState.category}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards.includes("createBrandCard") && (
        <div ref={createRefCallback("createBrandCard")}>
          <CreateProductBrandCard
            isLoading={state.isCreateBrandCardLoading}
            isPhotoUploaderLoading={productsState.isPhotoUploaderLoading}
            brand={productsState.brand}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );*/
}
