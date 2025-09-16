import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import { MarginsPageSliceActions as actions } from "@/state/slices/MarginsPageSlice";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { useMarginsPageService } from "@/pages/products-section/margins-page/useMarginsPageService.ts";
import cs from "./MarginsPage.module.scss";
import ProductMenuCard from "@/components/complex/custom-cards/product-menu-card/ProductMenuCard.tsx";
import MarginForPurchaseCard from "@/components/complex/custom-cards/margin-for-purchase-card/MarginForPurchaseCard.tsx";
import MarginConfigurationCard from "@/components/complex/custom-cards/margin-configuration-card/MarginConfigurationCard.tsx";
import SalePriseManagementCard from "@/components/complex/custom-cards/sale-price-management-card/SalePriceManagementCard.tsx";
import { useCardActions } from "@/utils/hooks/useCardActions.ts";
import SelectEntityCard from "@/components/complex/custom-cards/select-entity-card/SelectEntityCard.tsx";
import { MarginsListGridColumns } from "@/components/complex/grid/custom-grids/margins-list-grid/MarginsListGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export function MarginsPage() {
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.MARGINS,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );
  const service = useMarginsPageService();
  const { purchaseId } = useParams();
  const { createRefCallback } = useCardActions({
    selectActiveCards: (state) => state[StoreSliceEnum.MARGINS].activeCards,
    refreshAction: actions.refreshActiveCards,
  });

  useEffect(() => {
    service.getMarginPageDataHandle(purchaseId);
  }, [purchaseId]);

  useEffect(() => {
    service.getMarginItemsListHandle(purchaseId);
  }, [state.marginItemsGriRequestModel]);

  useEffect(() => {
    service.keepSalePriceManagementCardOpenHandle();
  }, [state.activeCards]);

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
        service.updateMarginHandle(payload, purchaseId);
        break;
      case "updateSelectedMargin":
        service.updateSelectedMarginHandler(payload, purchaseId);
        break;
      case "manageSelectedMargin":
        service.manageSelectedMarginHandle(payload);
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
        service.gridRequestChangeHandle(payload);
        break;
      case "brandFilter":
        service.gridRequestChangeHandle({ filter: { brands: payload } });
        break;
      case "categoryFilter":
        service.gridRequestChangeHandle({ filter: { categories: payload } });
        break;
      case "applyVisibleMarginItems":
        service.applyVisibleMarginItemsHandle(purchaseId);
        break;
      case "applyAllMarginItems":
        service.applyAllMarginItemsHandle(purchaseId);
        break;
    }
  }

  return (
    <div className={cs.marginPage}>
      <ProductMenuCard
        isLoading={state.isProductMenuCardLoading}
        title="Report Purchase"
        itemsCollection="purchases"
        itemId={Number(purchaseId)}
        counter={productsState.purchaseCounters}
      />
      <MarginForPurchaseCard
        isLoading={state.isMarginForPurchaseCardLoading}
        margin={state.selectedMargin}
        onAction={onAction}
      />
      {state.activeCards?.includes("salePriceManagementCard") && (
        <div ref={createRefCallback("salePriceManagementCard")}>
          <SalePriseManagementCard
            isLoading={state.isSalePriceManagementCardLoading}
            isGridLoading={state.isMarginProductsGridLoading}
            brands={productsState.brands}
            categories={productsState.categories}
            sizes={productsState.sizesForFilter}
            colors={productsState.colorsForFilter}
            taxes={productsState.taxesList}
            sortingOptions={productsState.sortingOptions}
            gridModel={state.marginItemsGridModel}
            gridRequestModel={state.marginItemsGriRequestModel}
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
    </div>
  );
}
