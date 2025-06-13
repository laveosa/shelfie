import { useParams } from "react-router-dom";
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

export function PurchaseProductsPage() {
  const dispatch = useAppDispatch();
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
      productsService.getPurchaseCountersHandler(Number(purchaseId));
    }
    if (!state.purchaseProducts) {
      service
        .getListOfPurchaseProductsForGridHandler(
          purchaseId,
          state.purchasesProductsGridRequestModel,
        )
        .then(() => actions);
    }
    productsService
      .getTheProductsForGridHandler(
        productsState.productsGridRequestModel,
        true,
      )
      .then((res) => {
        dispatch(productsActions.refreshProductsGridModel(res));
        dispatch(productsActions.refreshProducts(res.items));
      });
  }, [purchaseId]);

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

  return (
    <div className={cs.purchaseProductsPage}>
      <ProductMenuCard
        isLoading={productsState.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        productId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
        onAction={handleCardAction}
      />
      <PurchaseProductsCard
        products={productsState.products}
        purchaseProducts={state.purchaseProducts}
        productsGridModel={state.purchasesProductsGridModel}
        purchaseProductsGridModel={state.purchasesProductsGridModel}
        sortingOptions={productsState.sortingOptions}
        preferences={appState.preferences}
        brands={productsState.brands}
        categories={productsState.categories}
        purchaseProductsSkeletonQuantity={
          state.purchasesProductsGridRequestModel.pageSize
        }
        productsSkeletonQuantity={
          productsState.productsGridRequestModel.pageSize
        }
      />
    </div>
  );
}
