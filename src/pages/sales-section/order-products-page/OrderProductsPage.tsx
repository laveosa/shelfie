import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./OrderProductsPage.module.scss";
import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IOrdersPageSlice } from "@/const/interfaces/store-slices/IOrdersPageSlice.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { OrderProductsPageSliceActions as actions } from "@/state/slices/OrderProductsPageSlice";
import { IOrderDetailsPageSlice } from "@/const/interfaces/store-slices/IOrderDetailsPageSlice.ts";
import FindProductsCard from "@/components/complex/custom-cards/find-products-card/FindProductsCard.tsx";
import ProductsInOrderCard from "@/components/complex/custom-cards/products-in-order-card/ProductsInOrderCard.tsx";
import useOrderProductsPageService from "@/pages/sales-section/order-products-page/useOrderProductsPageService.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";

export function OrderProductsPage() {
  // ==================================================================== UTILITIES
  const { handleCardAction, createRefCallback } = useCardActions({
    selectActiveCards: (state) =>
      state[StoreSliceEnum.ORDER_PRODUCTS].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const state = useAppSelector<IOrderDetailsPageSlice>(
    StoreSliceEnum.ORDER_PRODUCTS,
  );
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const ordersState = useAppSelector<IOrdersPageSlice>(StoreSliceEnum.ORDERS);
  const service = useOrderProductsPageService();
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));
  const { orderId } = useParams();

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getOrderStockActionsListForGrid(orderId);
  }, [orderId]);

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "addProduct":
        handleCardAction("findProductsCard", true);
        service.addProductHandler();
        break;
      case "addVariantToOrder":
        service.addVariantsToOrderHandler(orderId, {
          variantId: payload.variantId,
          amount: payload.amount,
        });
        break;
      case "variantsGridRequestChange":
        service.variantsGridRequestChange(payload);
        break;
      case "closeFindProductsCard":
        handleCardAction("findProductsCard");
        break;
      case "updateStockAction":
        service.updateStockActionInOrderHandler(
          payload.row.original.stockActionId,
          payload.formData,
        );
        break;
      case "removeStockAction":
        service.removeStockActionFromOrderHandler(
          payload.original.stockActionId,
        );
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.orderProductsPage}>
      <SheContextSidebar
        menuCollectionType="order"
        menuTitle="Order"
        itemId={Number(orderId)}
        counter={ordersState.productCounter}
      >
        <ProductsInOrderCard
          isLoading={state.isProductsInOrderCardLoading}
          isGridLoading={state.isProductsInOrderGridLoading}
          stockActions={ordersState.stockActionsGridRequestModel.items}
          onAction={onAction}
        />
        {state.activeCards?.includes("findProductsCard") && (
          <div ref={createRefCallback("findProductsCard")}>
            <FindProductsCard
              isLoading={state.isFindProductsCardLoading}
              isGridLoading={state.isFindProductsGridLoading}
              variants={ordersState.variantsGridRequestModel.items}
              gridRequestModel={ordersState.variantsGridRequestModel}
              preferences={appState.preferences}
              sortingOptions={sortingItems}
              colorsForFilter={ordersState.colorsForFilter}
              sizesForFilter={ordersState.sizesForFilter}
              categories={ordersState.categories}
              brands={ordersState.brands}
              onAction={onAction}
            />
          </div>
        )}
      </SheContextSidebar>
    </div>
  );
}
