import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";

import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";
import cs from "@/pages/sales-section/open-carts-page/OpenCartPage.module.scss";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import useOpenCartsPageService from "@/pages/sales-section/open-carts-page/useOpenCartsPageService.ts";
import OpenCartsCard from "@/components/complex/custom-cards/open-carts-card/OpenCartsCard.tsx";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { OpenCartsPageSliceActions as actions } from "@/state/slices/OpenCartsPageSlice.ts";
import CustomerCartCard from "@/components/complex/custom-cards/customer-cart-card/CustomerCartCard.tsx";
import CustomerCard from "@/components/complex/custom-cards/customer-card/CustomerCard.tsx";
import FindProductsCard from "@/components/complex/custom-cards/find-products-card/FindProductsCard.tsx";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import { CustomersListGridColumns } from "@/components/complex/grid/custom-grids/customers-list-grid/CustomersListGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import SendMessageCard from "@/components/complex/custom-cards/send-message-card/SendMessageCard.tsx";
import ReplaceVariantCard from "@/components/complex/custom-cards/replace-variant-card/ReplaceVariantCard.tsx";
import CreateOrderCard from "@/components/complex/custom-cards/create-order-card/CreateOrderCard.tsx";
import StockHistoryCard from "@/components/complex/custom-cards/stock-history-card/StockHistoryCard.tsx";
import CartsWithSpecificProductCard from "@/components/complex/custom-cards/carts-with-specific-product-card/CartsWithSpecificProductCard.tsx";

export function OpenCartsPage() {
  // ==================================================================== UTILITIES
  const { handleCardAction, handleMultipleCardActions, createRefCallback } =
    useCardActions({
      selectActiveCards: (state) =>
        state[StoreSliceEnum.OPEN_CARTS].activeCards,
      refreshAction: actions.refreshActiveCards,
    });
  const { state, appState, dispatch, ...service } = useOpenCartsPageService(
    handleCardAction,
    handleMultipleCardActions,
  );
  const { translate } = useAppTranslation();
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));

  // ==================================================================== EVENT HANDLERS
  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getListOfCartsForGridHandler(state.openCartsGridRequestModel);
    dispatch(actions.refreshActiveCards([]));
  }, []);

  function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "manageCart":
        service.manageCartHandler(payload);
        break;
      case "createCart":
        service.createCartHandler();
        break;
      case "gridRequestChange":
        service.handleGridRequestChange(payload);
        break;
      case "prepackedStatusFilterChange":
        service.prepackedStatusFilterChangeHandler(payload);
        break;
      case "applyColumns":
        service.updateUserPreferencesHandler(payload);
        break;
      case "resetColumns":
        service.resetUserPreferencesHandler("products");
        break;
      case "manageCustomer":
        service.manageCustomerHandler(payload);
        break;
      case "closeCustomerCard":
        service.closeCustomerCardHandler();
        break;
      case "closeCustomerCartCard":
        service.closeCustomerCartCardHandler();
        break;
      case "openFindProductsCard":
        service.openFindProductsCardHandler();
        break;
      case "variantsGridRequestChange":
        service.variantsGridRequestChange(payload);
        break;
      case "deleteCustomer":
        service.deleteCustomerHandler(payload);
        break;
      case "updateCustomer":
        service.updateCustomerHandler(payload);
        break;
      case "closeFindProductsCard":
        service.closeFindProductsCardHandler();
        break;
      case "openSelectEntityCard":
        service.openSelectEntityCardHandler();
        break;
      case "selectCustomer":
        service.selectCustomerHandler(payload);
        break;
      case "searchEntity":
        service.searchEntityHandle(payload);
        break;
      case "openCreateEntityCard":
        service.openCreateEntityCardHandler();
        break;
      case "closeSelectEntityCard":
        service.closeSelectEntityCardHandler();
        break;
      case "openCustomerCard":
        service.openCustomerCardHandler();
        break;
      case "createCustomer":
        service.createCustomerHandler(payload);
        break;
      case "addVariant":
        service.addVariantToCartHandler(payload);
        break;
      case "openSendMessageCard":
        service.openSendMessageCardHandler();
        break;
      case "closeSendMessageCard":
        service.closeSendMessageCardHandler();
        break;
      case "openReplaceVariantCard":
        service.openReplaceVariantCardHandler(payload);
        break;
      case "deleteStockAction":
        service.deleteStockActionHandler(payload);
        break;
      case "closeReplaceVariantCard":
        service.closeReplaceVariantCardHandler();
        break;
      case "cancelCart":
        service.cancelCartHandler();
        break;
      case "createOrder":
        service.createOrderHandler();
        break;
      case "createNewOrder":
        service.createNewOrderHandler();
        break;
      case "closeCreateOrderCard":
        service.closeCreateOrderCardHandler();
        break;
      case "removeVariantFromOrder":
        service.removeVariantFromOrderHandler(payload);
        break;
      case "addVariantToOrder":
        service.addVariantToOrderHandler(payload);
        break;
      case "updateCartPrepackedStatus":
        service.updateCartPrepackedStatusHandler(payload);
        break;
      case "manageProduct":
        service.manageProductHandler(payload);
        break;
      case "manageVariant":
        service.manageVariantHandler(payload);
        break;
      case "stockChangeHistory":
        service.stockChangeHistoryHandler(payload);
        break;
      case "closeVariantHistoryCard":
        service.closeVariantHistoryCardHandler();
        break;
      case "openCartsWithSpecificProductCard":
        service.openCartsWithSpecificProductCardHandler(payload);
        break;
      case "closeCartsWithSpecificProductCard":
        service.closeCartsWithSpecificProductCardHandler();
        break;
      case "updateStockActionPrice":
        service.updateStockActionPriceHandler(payload);
        break;
      case "selectReplacedVariant":
        service.selectReplacedVariantHandler();
        break;
      case "selectCartWithSpecificProduct":
        service.selectCartWithSpecificProductHandler();
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.openCartsPage}>
      <SheContextSidebar
        menuCollectionType="sales"
        menuTitle="Sales"
        counter={state.salesCounters}
        activeCards={state.activeCards}
      >
        <OpenCartsCard
          isLoading={state.isOpenCartsCardLoading}
          isGridLoading={state.isOpenCartsGridLoading}
          openCartsGridRequestModel={state.openCartsGridRequestModel}
          preferences={appState.preferences}
          onAction={onAction}
          sortingOptions={sortingItems}
        />
        {state.activeCards.includes("customerCartCard") && (
          <div ref={createRefCallback("customerCartCard")}>
            <CustomerCartCard
              isGridLoading={state.isCartContentGridLoading}
              cartContent={state.managedCart}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards?.includes("selectEntityCard") && (
          <div ref={createRefCallback("selectEntityCard")}>
            <SelectEntityCard
              isLoading={state.isSelectEntityCardLoading}
              isGridLoading={state.isSelectEntityGridLoading}
              entityName={"Customer"}
              entityCollection={state.customersGridRequestModel.items}
              columns={
                CustomersListGridColumns({
                  onAction,
                }) as ColumnDef<DataWithId>[]
              }
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards?.includes("customerCard") && (
          <div
            className={cs.findProductsCard}
            ref={createRefCallback("customerCard")}
          >
            <CustomerCard
              isLoading={state.isCustomerCardLoading}
              customer={state.managedCustomer}
              showCloseButton
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards?.includes("findProductsCard") && (
          <div
            className={cs.findProductsCard}
            ref={createRefCallback("findProductsCard")}
          >
            <FindProductsCard
              isLoading={state.isFindProductsCardLoading}
              isGridLoading={state.isFindProductsGridLoading}
              variants={state.variantsGridRequestModel.items}
              gridRequestModel={state.variantsGridRequestModel}
              preferences={appState.preferences}
              sortingOptions={sortingItems}
              colorsForFilter={state.colorsForFilter}
              sizesForFilter={state.sizesForFilter}
              categories={state.categories}
              brands={state.brands}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("sendMessageCard") && (
          <div ref={createRefCallback("sendMessageCard")}>
            <SendMessageCard
              onAction={onAction}
              selectedCustomer={state.managedCart.customer}
              customersList={state.customersGridRequestModel.items}
            />
          </div>
        )}
        {state.activeCards.includes("replaceVariantCard") && (
          <div ref={createRefCallback("replaceVariantCard")}>
            <ReplaceVariantCard
              isGridLoading={state.isReplaceVariantGridLoading}
              variant={state.selectedVariant}
              variantsList={state.variantsList}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("cartsWithSpecificProductCard") && (
          <div ref={createRefCallback("cartsWithSpecificProductCard")}>
            <CartsWithSpecificProductCard
              isGridLoading={state.isCartsWithSpecificProductGridLoading}
              variant={state.selectedVariant}
              cartsList={state.cartsWithSpecificProduct}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("createOrderCard") && (
          <div ref={createRefCallback("createOrderCard")}>
            <CreateOrderCard
              isLoading={state.isCreateOrderCardLoading}
              isGridLoading={state.isCreateOrderGridLoading}
              cartContent={state.managedCart}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards.includes("variantHistoryCard") && (
          <div ref={createRefCallback("variantHistoryCard")}>
            <StockHistoryCard
              isLoading={state.isVariantHistoryCardLoading}
              isGridLoading={state.isVariantsHistoryGridLoading}
              variant={state.selectedVariant}
              data={state.variantHistory}
              onAction={onAction}
            />
          </div>
        )}
      </SheContextSidebar>
    </div>
  );
}
