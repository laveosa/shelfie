import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import cs from "./MarginsPage.module.scss";
import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";
import MarginForPurchaseCard from "@/components/complex/custom-cards/margin-for-purchase-card/MarginForPurchaseCard.tsx";
import MarginConfigurationCard from "@/components/complex/custom-cards/margin-configuration-card/MarginConfigurationCard.tsx";
import SalePriseManagementCard from "@/components/complex/custom-cards/sale-price-management-card/SalePriceManagementCard.tsx";
import { MarginsListGridColumns } from "@/components/complex/grid/custom-grids/margins-list-grid/MarginsListGridColumns.tsx";
import SheContextSidebar from "@/components/complex/she-context-sidebar/SheContextSidebar.tsx";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import { MarginsPageSliceActions as actions } from "@/state/slices/MarginsPageSlice";
import { useMarginsPageService } from "@/pages/products-section/margins-page/useMarginsPageService.ts";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export function MarginsPage() {
  // ==================================================================== UTILITIES
  const {
    handleCardAction,
    handleMultipleCardActions,
    keepOnlyCards,
    createRefCallback,
  } = useCardActions({
    selectActiveCards: (state) => state[StoreSliceEnum.MARGINS].activeCards,
    refreshAction: actions.refreshActiveCards,
  });
  const { state, appState, productsState, ...service } = useMarginsPageService(
    handleCardAction,
    handleMultipleCardActions,
    keepOnlyCards,
  );
  const { purchaseId } = useParams();
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    service.getMarginPageDataHandle(purchaseId);
  }, [purchaseId]);

  useEffect(() => {
    service.getMarginItemsListHandle(purchaseId);
  }, []);

  useEffect(() => {
    service.keepSalePriceManagementCardOpenHandle();
  }, [state.activeCards]);

  // ==================================================================== EVENT HANDLERS
  async function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "openSelectMarginCard":
        service.openSelectMarginCardHandle();
        break;
      case "searchEntity":
        service.searchEntityHandle(payload);
        break;
      case "selectMargin":
        service.selectMarginHandle(payload, purchaseId);
        break;
      case "detachMargin":
        service.detachMarginHandle(purchaseId);
        break;
      case "createMargin":
        service.createMarginHandle(payload);
        break;
      case "updateMargin":
        service.updateMarginHandle(payload);
        break;
      case "updateSelectedMargin":
        service.updateSelectedMarginHandler(payload, purchaseId);
        break;
      case "manageMargin":
        service.manageMarginHandle(payload);
        break;
      case "deleteMargin":
        service.deleteMarginHandle(payload, purchaseId);
        break;
      case "restoreMargin":
        service.restoreMarginHandle(payload, purchaseId);
        break;
      case "restoreMarginRules":
        service.restoreMarginRulesHandle(purchaseId);
        break;
      case "updateMarginItem":
        service.updateMarginItemHandle(payload);
        break;
      case "applyMarginItem":
        service.applyMarginItemItemHandle(payload);
        break;
      case "openCreateEntityCard":
        service.openCreateEntityCardHandle();
        break;
      case "closeSelectEntityCard":
        service.closeSelectEntityCardHandle();
        break;
      case "closeSelectMarginCard":
        service.closeSelectMarginCardHandle();
        break;
      case "closeMarginConfigurationCard":
        service.closeMarginConfigurationCardHandle();
        break;
      case "applyColumns":
        service.applyColumnsHandle(payload);
        break;
      case "resetColumns":
        service.resetColumnsHandle();
        break;
      case "gridRequestChange":
        service.gridRequestChangeHandle(purchaseId, payload);
        break;
      case "applyVisibleMarginItems":
        service.applyVisibleMarginItemsHandle(purchaseId);
        break;
      case "applyAllMarginItems":
        service.applyAllMarginItemsHandle(purchaseId);
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.marginPage}>
      <SheContextSidebar
        menuCollectionType="purchases"
        menuTitle={"Manage Product"}
        itemId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
        activeCards={state.activeCards}
      >
        <MarginForPurchaseCard
          isLoading={state.isMarginForPurchaseCardLoading}
          margin={state.selectedMargin}
          onAction={onAction}
        />
        {state.activeCards?.includes("salePriceManagementCard") && (
          <div
            className={cs.salePriceManagementCard}
            ref={createRefCallback("salePriceManagementCard")}
          >
            <SalePriseManagementCard
              isLoading={state.isSalePriceManagementCardLoading}
              isGridLoading={state.isMarginProductsGridLoading}
              preferences={appState.preferences}
              brands={productsState.brands}
              categories={productsState.categories}
              sizes={productsState.sizesForFilter}
              colors={productsState.colorsForFilter}
              taxes={productsState.taxesList}
              sortingOptions={sortingItems}
              gridRequestModel={state.marginItemsGridRequestModel}
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards?.includes("selectEntityCard") && (
          <div ref={createRefCallback("selectEntityCard")}>
            <SelectEntityCard
              isLoading={state.isSelectMarginCardLoading}
              isGridLoading={state.isMarginListGridLoading}
              entityName="Margin"
              entityCollection={state.marginsList}
              columns={
                MarginsListGridColumns({
                  onAction,
                }) as ColumnDef<DataWithId>[]
              }
              onAction={onAction}
            />
          </div>
        )}
        {state.activeCards?.includes("marginConfigurationCard") && (
          <div ref={createRefCallback("marginConfigurationCard")}>
            <MarginConfigurationCard
              isLoading={state.isMarginConfigurationCardLoading}
              margin={state.managedMargin}
              onAction={onAction}
            />
          </div>
        )}
      </SheContextSidebar>
    </div>
  );
}
