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
import { OrdersPageSliceActions as ordersActions } from "@/state/slices/OrdersPageSlice.ts";
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
  const { handleCardAction, createRefCallback } = useCardActions({
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
  }, [ordersState.stockActionsGridRequestModel]);

  const fakeStockData = {
    priceType: null,
    filter: null,
    pager: {
      totalItems: 10,
      totalPages: 1,
      startPage: 1,
      endPage: 1,
      currentPage: 1,
      pageSize: 10,
    },
    items: Array.from({ length: 10 }, (_, i) => ({
      stockActionId: 100 + i,
      productId: 200 + i,
      variantId: 300 + i,
      variantName: `Mock Product ${i + 1}`,
      variantCode: `MOCKCODE${300 + i}`,
      brand: {
        brandId: 10 + i,
        brandName: `Brand ${i + 1}`,
        thumbnail: null,
      },
      photo: null,
      productCategory: {
        categoryId: 400 + i,
        categoryName: `Category ${i + 1}`,
        thumbnail: null,
      },
      requestedPrice: null,
      stockDocumentPrice: {
        id: 500 + i,
        brutto: 10 + i,
        netto: 8 + i,
        taxAmount: 2,
        rateExchange: 1,
        createAt: new Date().toISOString(),
        activeUntil: null,
        currencyId: 1,
        currencyName: "zł.",
        taxTypeId: 5,
        taxTypeName: "np.",
      },
      traitOptions: [
        {
          optionId: 600 + i,
          optionName: ["Blue", "Red", "Green", "Black", "White"][i % 5],
          optionColor: ["#003af7", "#ff0000", "#00ff00", "#000000", "#ffffff"][
            i % 5
          ],
          isRaw: false,
          sortOrder: 0,
          traitTypeId: 2,
          traitTypeName: "Color",
        },
      ],
      unitsAmount: 5 + i,
    })),
  };

  useEffect(() => {
    dispatch(actions.setIsFindProductsGridLoading(true));
    ordersService
      .getVariantsForGridHandler(ordersState.variantsGridRequestModel)
      .then(() => {
        dispatch(actions.setIsFindProductsGridLoading(false));
      });
  }, [ordersState.variantsGridRequestModel]);

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
      case "variantsGridRequestChange":
        if (payload.brands || payload.categories || payload.filter) {
          dispatch(
            ordersActions.refreshVariantsGridRequestModel({
              ...ordersState.variantsGridRequestModel,
              currentPage: 1,
              ...payload,
            }),
          );
        } else {
          dispatch(
            ordersActions.refreshVariantsGridRequestModel({
              ...ordersState.variantsGridRequestModel,
              ...payload,
            }),
          );
        }
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
        stockActions={fakeStockData.items}
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
