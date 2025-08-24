import { Layers2, Plus, Shirt } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import _, { merge } from "lodash";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IPurchaseProductsCard } from "@/const/interfaces/complex-components/custom-cards/IPurchaseProductsCard.ts";
import cs from "./PurchaseProductsCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheTabs from "@/components/complex/she-tabs/SheTabs.tsx";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { PurchaseProductsPageSliceActions as actions } from "@/state/slices/PurchaseProductsPageSlice.ts";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { purchaseProductsGridColumns } from "@/components/complex/grid/purchase-products-grid/PurchaseProductsGridColumns.tsx";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { AppSliceActions as appActions } from "@/state/slices/AppSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import GridItemsFilter from "@/components/complex/grid/grid-items-filter/GridItemsFilter.tsx";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { purchaseVariantsGridColumns } from "@/components/complex/grid/purchase-variants-grid/PurchaseVariantsGridColumns.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import GridTraitsFilter from "@/components/complex/grid/grid-traits-filter/GridTraitsFilter.tsx";
import GridShowItemsFilter from "@/components/complex/grid/grid-show-deleted-filter/GridShowItemsFilter.tsx";

export default function PurchaseProductsCard({
  isLoading,
  isPurchaseProductsGridLoading,
  isProductsGridLoading,
  variants,
  purchaseProducts,
  purchaseProductsGridModel,
  variantsGridModel,
  preferences,
  sortingOptions,
  brands,
  categories,
  colorsForFilter,
  sizesForFilter,
  purchaseProductsSkeletonQuantity,
  variantsSkeletonQuantity,
  currencies,
  taxes,
  purchaseSummary,
  onAction,
}: IPurchaseProductsCard) {
  const [activeTab, setActiveTab] = useState("purchaseProducts");
  const productsService = useProductsPageService();
  const dispatch = useAppDispatch();
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );

  function handleTabChange(value: string) {
    if (value === activeTab) return;
    setActiveTab(value);
    dispatch(actions.refreshActiveTab(value));
  }

  function handleAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "addProductToPurchase":
        onAction("addProductToPurchase", payload);
        break;
      case "updatePurchaseProduct":
        onAction("updatePurchaseProduct", payload);
        break;
      case "addVariant":
        onAction("addVariantGridAction", payload.original);
        break;
      case "manageVariant":
        onAction("manageVariant", payload.original);
        break;
      case "transferToPurchase":
        console.log("transferToPurchase");
        break;
      case "removeFromStock":
        onAction("deleteStockActionInGrid", payload.original);
        break;
      case "stockChangeHistory":
        onAction("openVariantHistoryCard", payload.original.variantId);
        break;
      case "navigateToManageVariant":
        onAction("navigateToManageVariant", payload);
        break;
    }
  }

  function handleGridRequestChange(updates: GridRequestModel) {
    if ("searchQuery" in updates || "currentPage" in updates) {
      if (activeTab === "purchaseProducts") {
        dispatch(
          actions.refreshPurchasesProductsGridRequestModel({
            ...state.purchasesProductsGridRequestModel,
            ...updates,
          }),
        );
      } else if (activeTab === "connectProducts") {
        dispatch(
          actions.refreshVariantsForPurchaseGridRequestModel({
            ...state.variantsForPurchaseGridRequestModel,
            ...updates,
          }),
        );
      }
    } else {
      if (activeTab === "purchaseProducts") {
        dispatch(
          actions.refreshPurchasesProductsGridRequestModel({
            ...state.purchasesProductsGridRequestModel,
            currentPage: 1,
            filter: {
              ...state.purchasesProductsGridRequestModel.filter,
              ...updates,
            },
          }),
        );
      } else if (activeTab === "connectProducts") {
        dispatch(
          actions.refreshVariantsForPurchaseGridRequestModel({
            ...state.variantsForPurchaseGridRequestModel,
            currentPage: 1,
            filter: {
              ...state.variantsForPurchaseGridRequestModel.filter,
              ...updates,
            },
          }),
        );
      }
    }
  }

  function onApplyColumnsHandler(model: PreferencesModel) {
    const modifiedModel = merge({}, appState.preferences, model);
    dispatch(appActions.refreshPreferences(modifiedModel));
    productsService.updateUserPreferencesHandler(modifiedModel);
  }

  function onResetColumnsHandler() {
    productsService.resetUserPreferencesHandler("products");
  }

  return (
    <div
      className={`${cs.purchaseProductsCardWrapper} ${isLoading ? cs.cardContentLoading : ""}`}
    >
      {isLoading && <SheLoading className={cs.purchaseProductsCardLoader} />}
      <SheProductCard
        className={cs.purchaseProductsCard}
        showHeader={false}
        title={"Manage Purchases"}
        minWidth="1100px"
      >
        <div className={cs.purchaseProductsCardContent}>
          <SheTabs
            defaultValue="purchaseProducts"
            onValueChange={handleTabChange}
          >
            <div className={cs.tabItemsWrapper}>
              <TabsList className={cs.tabItems}>
                <div>
                  <TabsTrigger
                    className={cs.tabItemTrigger}
                    value="purchaseProducts"
                  >
                    <div className={cs.tabBlock}>
                      <Shirt size="16" /> Purchase Products
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    className={cs.tabItemTrigger}
                    value="connectProducts"
                  >
                    <div className={cs.tabBlock}>
                      <Layers2 size="16" />
                      Connect Products
                    </div>
                  </TabsTrigger>
                </div>
                <SheButton
                  icon={Plus}
                  variant="default"
                  onClick={() => onAction("openCreateProductCard")}
                  value="Create Product"
                />
              </TabsList>
            </div>
            <TabsContent value="purchaseProducts">
              <DndGridDataTable
                isLoading={isPurchaseProductsGridLoading}
                columns={
                  purchaseProductsGridColumns(
                    currencies,
                    taxes,
                    activeTab,
                    handleAction,
                  ) as ColumnDef<DataWithId>[]
                }
                data={purchaseProducts}
                gridModel={purchaseProductsGridModel}
                sortingItems={sortingOptions}
                columnsPreferences={preferences}
                preferenceContext={"productReferences"}
                skeletonQuantity={purchaseProductsSkeletonQuantity}
                onApplyColumns={onApplyColumnsHandler}
                onDefaultColumns={onResetColumnsHandler}
                onGridRequestChange={handleGridRequestChange}
              >
                <GridItemsFilter
                  items={brands}
                  columnName={"Brands"}
                  getId={(item: BrandModel) => item.brandId}
                  getName={(item: BrandModel) => item.brandName}
                />
                <GridItemsFilter
                  items={categories}
                  columnName={"Categories"}
                  getId={(item: CategoryModel) => item.categoryId}
                  getName={(item: CategoryModel) => item.categoryName}
                />
              </DndGridDataTable>
              <div className={cs.purchaseSummary}>
                <span className={cs.purchaseSummaryTitle}>
                  Products Summary
                </span>
                <div className={cs.purchaseSummaryItems}>
                  <div>
                    <span className={cs.purchaseSummaryTitle}>Units</span>
                    {!_.isNil(purchaseSummary?.unitsAmount) && (
                      <span className={cs.purchaseSummaryItem}>
                        {`: ${purchaseSummary?.unitsAmount}`}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className={cs.purchaseSummaryTitle}>Expense</span>
                    {!_.isNil(purchaseSummary?.expense) && (
                      <span className={cs.purchaseSummaryItem}>
                        {`: ${purchaseSummary?.expense} ${purchaseSummary?.currencyBrief}`}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className={cs.purchaseSummaryTitle}>
                      Projected value
                    </span>
                    {!_.isNil(purchaseSummary?.valueAmount) && (
                      <span className={cs.purchaseSummaryItem}>
                        {`: ${purchaseSummary?.valueAmount} ${purchaseSummary?.currencyBrief}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="connectProducts">
              <DndGridDataTable
                isLoading={isProductsGridLoading}
                columns={
                  purchaseVariantsGridColumns(
                    currencies,
                    taxes,
                    activeTab,
                    handleAction,
                  ) as ColumnDef<DataWithId>[]
                }
                data={variants}
                gridModel={variantsGridModel}
                sortingItems={sortingOptions}
                columnsPreferences={preferences}
                preferenceContext={"productReferences"}
                skeletonQuantity={variantsSkeletonQuantity}
                onApplyColumns={onApplyColumnsHandler}
                onDefaultColumns={onResetColumnsHandler}
                onGridRequestChange={handleGridRequestChange}
              >
                <GridItemsFilter
                  items={brands}
                  columnName={"Brands"}
                  getId={(item: BrandModel) => item.brandId}
                  getName={(item: BrandModel) => item.brandName}
                />
                <GridItemsFilter
                  items={categories}
                  columnName={"Categories"}
                  getId={(item: CategoryModel) => item.categoryId}
                  getName={(item: CategoryModel) => item.categoryName}
                />
                <GridTraitsFilter
                  traitOptions={colorsForFilter}
                  traitType="color"
                  gridRequestModel={state.variantsForPurchaseGridRequestModel}
                />
                <GridTraitsFilter
                  traitOptions={sizesForFilter}
                  traitType="size"
                  gridRequestModel={state.variantsForPurchaseGridRequestModel}
                />
                <GridShowItemsFilter context="Deleted" />
              </DndGridDataTable>
            </TabsContent>
          </SheTabs>
        </div>
      </SheProductCard>
    </div>
  );
}
