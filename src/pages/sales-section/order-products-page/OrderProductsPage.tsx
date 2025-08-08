import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "@/pages/sales-section/orders-page/OrdersPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import useOrdersPageService from "@/pages/sales-section/orders-page/useOrdersPageService.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { OrderProductsPageSliceActions as actions } from "@/state/slices/OrderProductsPageSlice";
import { IOrderDetailsPageSlice } from "@/const/interfaces/store-slices/IOrderDetailsPageSlice.ts";
import FindProductsCard from "@/components/complex/custom-cards/find-products-card/FindProductsCard.tsx";
import ProductsInOrderCard from "@/components/complex/custom-cards/products-in-order-card/ProductsInOrderCard.tsx";
import useOrderProductsPageService from "@/pages/sales-section/order-products-page/useOrderProductsPageService.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";

export function OrderProductsPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<IOrderDetailsPageSlice>(
    StoreSliceEnum.ORDER_PRODUCTS,
  );
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const service = useOrderProductsPageService();
  const ordersService = useOrdersPageService();
  const { orderId } = useParams();
  const { handleCardAction, handleMultipleCardActions, createRefCallback } =
    useCardActions({
      selectActiveCards: (state) =>
        state[StoreSliceEnum.ORDER_PRODUCTS].activeCards,
      refreshAction: actions.refreshActiveCards,
    });

  useEffect(() => {
    dispatch(actions.setIsProductsInOrderGridLoading(true));
    ordersService
      .getListOfStockActionsForGridHandler(
        orderId,
        ordersState.stockActionsGridRequestModel,
      )
      .then(() => {
        dispatch(actions.setIsProductsInOrderGridLoading(false));
      });
  }, []);

  useEffect(() => {
    if (ordersState.brands.length === 0) {
      ordersService.getBrandsForFilterHandler();
    }
    if (ordersState.categories.length === 0) {
      ordersService.getCategoriesForFilterHandler();
    }
    if (ordersState.sortingOptions.length === 0) {
      ordersService.getSortingOptionsForGridHandler();
    }
    if (
      ordersState.sizesForFilter.length === 0 ||
      ordersState.colorsForFilter.length === 0
    )
      ordersService.getTraitsForFilterHandler();
  }, []);

  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "addProduct":
        handleCardAction("findProductsCard", true);
        dispatch(actions.setIsFindProductsGridLoading(true));
        ordersService
          .getVariantsForGridHandler(ordersState.variantsGridRequestModel)
          .then(() => {
            dispatch(actions.setIsFindProductsGridLoading(false));
          });
        break;
      case "addVariantToOrder":
        dispatch(actions.setIsProductsInOrderGridLoading(true));
        service
          .addVariantsToOrderHandler(orderId, {
            variantId: payload.variantId,
            amount: payload.amount,
          })
          .then(() => {
            dispatch(actions.setIsFindProductsCardLoading(false));
          });
        break;
      case "closeFindProductsCard":
        handleCardAction("findProductsCard");
        break;
    }
  }

  return (
    <div className={cs.ordersPage}>
      <ProductMenuCard
        title="Order"
        itemsCollection="order"
        itemId={Number(orderId)}
      />
      <ProductsInOrderCard
        isLoading={state.isProductsInOrderCardLoading}
        isGridLoading={state.isProductsInOrderGridLoading}
        stockActions={ordersState.stockActionsGridModel.item}
        gridModel={ordersState.stockActionsGridModel}
        gridRequestModel={ordersState.stockActionsGridRequestModel}
        onAction={onAction}
      />
      {state.activeCards?.includes("findProductsCard") && (
        <div ref={createRefCallback("findProductsCard")}>
          <FindProductsCard
            isLoading={state.isFindProductsCardLoading}
            isGridLoading={state.isFindProductsGridLoading}
            variants={ordersState.variantsGridModel.items}
            gridRequestModel={ordersState.variantsGridRequestModel}
            gridModel={ordersState.variantsGridModel}
            preferences={appState.preferences}
            sortingOptions={ordersState.sortingOptions}
            colorsForFilter={ordersState.colorsForFilter}
            sizesForFilter={ordersState.sizesForFilter}
            categories={ordersState.categories}
            brands={ordersState.brands}
            onAction={onAction}
          />
        </div>
      )}
    </div>
  );
}
