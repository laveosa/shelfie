import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./PurchaseProductsPage.module.scss";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import usePurchaseProductsPageService from "@/pages/products-section/purchase-products-page/usePurchaseProductsPageService.ts";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import PurchaseProductsCard from "@/components/complex/custom-cards/purchase-products-card/PurchaseProductsCard.tsx";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { PurchaseProductsPageSliceActions as actions } from "@/state/slices/PurchaseProductsPageSlice.ts";
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import ProductConfigurationCard from "@/components/complex/custom-cards/product-configuration-card/ProductConfigurationCard.tsx";
import CreateProductCategoryCard from "@/components/complex/custom-cards/create-product-category-card/CreateProductCategoryCard.tsx";
import CreateProductBrandCard from "@/components/complex/custom-cards/create-product-brand-card/CreateProductBrandCard.tsx";
import { useToast } from "@/hooks/useToast.ts";
import ManageProductCard from "@/components/complex/grid/manage-product-card/ManageProductCard.tsx";

export function PurchaseProductsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const service = usePurchaseProductsPageService();
  const productsService = useProductsPageService();
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const { purchaseId } = useParams();
  const cardRefs = React.useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (!productsState.purchaseCounters) {
      dispatch(actions.setIsProductMenuCardLoading(true));
      productsService
        .getPurchaseCountersHandler(Number(purchaseId))
        .then(() => dispatch(actions.setIsProductMenuCardLoading(false)));
    }
    if (productsState.currenciesList.length === 0) {
      productsService.getCurrenciesListHandler();
    }
    if (productsState.taxesList.length === 0) {
      productsService.getTaxesListHandler();
    }
    productsService.getTraitsForFilterHandler();
  }, [purchaseId]);

  useEffect(() => {
    dispatch(actions.setIsPurchaseProductsCardLoading(true));
    dispatch(actions.setIsPurchasesProductsGridLoading(true));
    service
      .getListOfPurchaseProductsForGridHandler(
        purchaseId,
        state.purchasesProductsGridRequestModel,
      )
      .then(() => {
        dispatch(actions.setIsPurchaseProductsCardLoading(false));
        dispatch(actions.setIsPurchasesProductsGridLoading(false));
      });
  }, [state.purchasesProductsGridRequestModel]);

  useEffect(() => {
    dispatch(actions.setIsPurchaseProductsCardLoading(true));
    dispatch(actions.setIsProductsGridLoading(true));
    productsService
      .getVariantsForGridHandler(productsState.variantsGridRequestModel)
      .then((res) => {
        dispatch(actions.setIsPurchaseProductsCardLoading(false));
        dispatch(actions.setIsProductsGridLoading(false));
        dispatch(productsActions.refreshVariantsGridModel(res));
        dispatch(productsActions.refreshVariants(res.items));
      });
  }, [productsState.variantsGridRequestModel]);

  useEffect(() => {
    if (productsState.brands.length === 0) {
      productsService.getBrandsForFilterHandler().then((res) => {
        dispatch(productsActions.refreshBrands(res));
      });
    }
    if (productsState.categories.length === 0) {
      productsService.getCategoriesForFilterHandler().then((res) => {
        dispatch(productsActions.refreshCategories(res));
      });
    }
    if (productsState.sortingOptions.length === 0) {
      productsService.getSortingOptionsForGridHandler().then((res) => {
        dispatch(productsActions.refreshSortingOptions(res));
      });
    }
    if (productsState.suppliers.length === 0) {
      productsService.getListOfSuppliersHandler().then((res) => {
        dispatch(productsActions.refreshSuppliers(res));
      });
    }
  }, []);

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
    const activeCards: string[] = Array.isArray(overrideActiveCards)
      ? overrideActiveCards
      : Array.isArray(state.activeCards)
        ? state.activeCards
        : [];
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

  useEffect(() => {
    handleCardAction("purchaseProductsCard", true);
  }, []);

  function onSubmitProductDataHandler(data: any) {
    if (state.selectedProduct) {
      updateProductDetails(data);
    } else {
      createNewProduct(data);
    }
  }

  function updateProductDetails(data) {
    dispatch(actions.setIsProductConfigurationCardLoading(true));
    productsService
      .updateProductHandler(state.selectedProduct.productId, data)
      .then((res) => {
        dispatch(actions.setIsProductConfigurationCardLoading(false));
        if (res.data) {
          dispatch(actions.refreshSelectedProduct(res.data));
          addToast({
            text: "Product updated successfully",
            type: "success",
          });
        } else {
          addToast({
            text: "Product not updated",
            description: res.error.message,
            type: "error",
          });
        }
      });
  }

  function createNewProduct(data) {
    dispatch(actions.setIsProductConfigurationCardLoading(true));
    productsService.createNewProductHandler(data).then((res) => {
      dispatch(actions.setIsProductConfigurationCardLoading(false));
      if (res.data) {
        productsService
          .getProductDetailsHandler(res.data.productId)
          .then((res) => {
            dispatch(actions.refreshSelectedProduct(res.data));
          });
        dispatch(actions.refreshSelectedProduct(res.data));
        const currentActiveCards = state.activeCards || [];
        const updatedCards = currentActiveCards
          .filter((card) => card !== "productConfigurationCard")
          .concat("manageProductCard");
        dispatch(actions.refreshActiveCards(updatedCards));
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

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "addProductToPurchase":
        service
          .addVariantToPurchaseProductsHandler(purchaseId, {
            variantId: payload.gridItemId,
            ...payload.data,
          })
          .then((res) => {
            if (res) {
              dispatch(actions.setIsPurchasesProductsGridLoading(true));
              service
                .getListOfPurchaseProductsForGridHandler(
                  purchaseId,
                  state.purchasesProductsGridRequestModel,
                )
                .then(() => {
                  dispatch(actions.setIsPurchasesProductsGridLoading(false));
                });
              addToast({
                text: "Variant added successfully",
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
      case "updatePurchaseProduct":
        service
          .updatePurchaseProductHandler(payload.stockActionId, payload.data)
          .then((res) => {
            if (!res.error) {
              dispatch(actions.setIsPurchasesProductsGridLoading(true));
              service
                .getListOfPurchaseProductsForGridHandler(
                  purchaseId,
                  state.purchasesProductsGridRequestModel,
                )
                .then(() =>
                  dispatch(actions.setIsPurchasesProductsGridLoading(false)),
                );
              addToast({
                text: "Product updated successfully",
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
      case "openCreateProductCard":
        dispatch(actions.setIsPurchaseProductsCardLoading(true));
        Promise.all([
          productsService.getSimpleListOfAllBrandsHandler(),
          productsService.getAllCategoriesByOrganizationHandler(),
        ]).then(([brands, categories]) => {
          dispatch(actions.setIsPurchaseProductsCardLoading(false));
          dispatch(actions.refreshBrands(brands));
          dispatch(actions.refreshCategories(categories));
          const currentActiveCards = state.activeCards || [];
          const updatedCards = currentActiveCards
            .filter((card) => card !== "purchaseProductsCard")
            .concat("productConfigurationCard");
          dispatch(actions.refreshActiveCards(updatedCards));
        });
        break;
      case "openPurchaseProductsCard":
        const currentActiveCards = state.activeCards || [];
        const updatedCards = currentActiveCards
          .filter((card) => card !== "manageProductCard")
          .concat("purchaseProductsCard");
        dispatch(actions.refreshActiveCards(updatedCards));
        break;
      case "openManageProductCard":
        handleCardAction("manageProductCard");
        dispatch(actions.setIsManageProductCardLoading(true));
        productsService
          .getListOfAllTraitsHandler()
          .then(() => dispatch(actions.setIsManageProductCardLoading(false)));
        break;
      case "manageProductData":
        handleCardAction("productConfigurationCard", true);
        break;
      case "manageProductPhotos":
        break;
      case "manageProductTraits":
        break;
      case "createProductVariants":
        break;
    }
  }

  return (
    <div className={cs.purchaseProductsPage}>
      <ProductMenuCard
        isLoading={state.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        productId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
        onAction={handleCardAction}
      />
      {state.activeCards?.includes("purchaseProductsCard") && (
        <div
          ref={(el) => {
            cardRefs.current["purchaseProductsCard"] = el;
          }}
        >
          <PurchaseProductsCard
            isLoading={state.isPurchaseProductsCardLoading}
            isPurchaseProductsGridLoading={state.isPurchaseProductsGridLoading}
            isProductsGridLoading={state.isProductsGriLoading}
            variants={productsState.variants}
            purchaseProducts={state.purchaseProducts}
            variantsGridModel={productsState.variantsGridModel}
            purchaseProductsGridModel={state.purchasesProductsGridModel}
            sortingOptions={productsState.sortingOptions}
            preferences={appState.preferences}
            brands={productsState.brands}
            categories={productsState.categories}
            purchaseProductsSkeletonQuantity={
              state.purchasesProductsGridRequestModel.pageSize
            }
            variantsSkeletonQuantity={
              productsState.variantsGridRequestModel.pageSize
            }
            currencies={productsState.currenciesList}
            taxes={productsState.taxesList}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards?.includes("manageProductCard") && (
        <div
          ref={(el) => {
            cardRefs.current["manageProductCard"] = el;
          }}
        >
          <ManageProductCard
            isLoading={state.isManageProductCardLoading}
            purchase={productsState.selectedPurchase}
            product={state.selectedProduct}
            traits={productsState.listOfTraits}
            onAction={onAction}
          />
        </div>
      )}
      {state.activeCards?.includes("productConfigurationCard") && (
        <div
          ref={(el) => {
            cardRefs.current["productConfigurationCard"] = el;
          }}
        >
          <ProductConfigurationCard
            isLoading={state.isProductConfigurationCardLoading}
            product={state.selectedProduct}
            brandsList={state.brands}
            categoriesList={state.categories}
            onGenerateProductCode={productsService.generateProductCodeHandler}
            onProductCodeChange={productsService.checkProductCodeHandler}
            onOpenCreateProductCategoryCard={() =>
              handleCardAction("createCategoryCard")
            }
            onOpenCreateProductBrandCard={() =>
              handleCardAction("createBrandCard")
            }
            onSecondaryButtonClick={() =>
              handleCardAction("productConfigurationCard")
            }
            onPrimaryButtonClick={(data) => onSubmitProductDataHandler(data)}
          />
        </div>
      )}
      {state.activeCards.includes("createCategoryCard") && (
        <div
          ref={(el) => {
            cardRefs.current["createCategoryCard"] = el;
          }}
        >
          <CreateProductCategoryCard
            isLoading={state.isCreateCategoryCardLoading}
            onSecondaryButtonClick={() =>
              handleCardAction("createCategoryCard")
            }
          />
        </div>
      )}
      {state.activeCards.includes("createBrandCard") && (
        <div
          ref={(el) => {
            cardRefs.current["createBrandCard"] = el;
          }}
        >
          <CreateProductBrandCard
            isLoading={state.isCreateBrandCardLoading}
            onSecondaryButtonClick={() => handleCardAction("createBrandCard")}
          />
        </div>
      )}
    </div>
  );
}
