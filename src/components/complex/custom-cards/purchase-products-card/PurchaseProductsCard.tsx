import { Layers2, Plus, Shirt } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import _, { merge } from "lodash";
import { useTranslation } from "react-i18next";

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
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { AppSliceActions as appActions } from "@/state/slices/AppSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import GridItemsFilter from "@/components/complex/grid/filters/grid-items-filter/GridItemsFilter.tsx";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import GridTraitsFilter from "@/components/complex/grid/filters/grid-traits-filter/GridTraitsFilter.tsx";
import GridShowItemsFilter from "@/components/complex/grid/filters/grid-show-deleted-filter/GridShowItemsFilter.tsx";
import { purchaseProductsGridColumns } from "@/components/complex/grid/custom-grids/purchase-products-grid/PurchaseProductsGridColumns.tsx";
import { purchaseVariantsGridColumns } from "@/components/complex/grid/custom-grids/purchase-variants-grid/PurchaseVariantsGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export default function PurchaseProductsCard({
  isLoading,
  isPurchaseProductsGridLoading,
  isProductsGridLoading,
  variants,
  purchaseProducts,
  purchaseProductsGridRequestModel,
  variantsGridRequestModel,
  preferences,
  sortingOptions,
  brands,
  categories,
  colorsForFilter,
  sizesForFilter,
  variantsSkeletonQuantity,
  currencies,
  taxes,
  purchaseSummary,
  onAction,
}: IPurchaseProductsCard) {
  const { t } = useTranslation();
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
    if (value === "purchaseProducts") {
      onAction("refreshPurchaseProductsTab", purchaseSummary.purchaseId);
    }
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
    if (activeTab === "purchaseProducts") {
      dispatch(
        actions.refreshPurchasesProductsGridRequestModel({
          ...state.purchasesProductsGridRequestModel,
          ...updates,
          filter: {
            ...state.purchasesProductsGridRequestModel.filter,
            ...updates.filter,
          },
        }),
      );
    } else {
      dispatch(
        actions.refreshVariantsForPurchaseGridRequestModel({
          ...state.variantsForPurchaseGridRequestModel,
          ...updates,
          filter: {
            ...state.variantsForPurchaseGridRequestModel.filter,
            ...updates.filter,
          },
        }),
      );
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
        title={t("CardTitles.ManagePurchases")}
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
                      <Shirt size="16" /> {t("TabLabels.PurchaseProducts")}
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    className={cs.tabItemTrigger}
                    value="connectProducts"
                  >
                    <div className={cs.tabBlock}>
                      <Layers2 size="16" />
                      {t("TabLabels.ConnectProducts")}
                    </div>
                  </TabsTrigger>
                </div>
                <SheButton
                  icon={Plus}
                  variant="default"
                  onClick={() => onAction("openCreateProductCard")}
                  value={t("ProductActions.CreateProduct")}
                />
              </TabsList>
            </div>
            <TabsContent value="purchaseProducts">
              <SheGrid
                isLoading={isPurchaseProductsGridLoading}
                className={cs.purchaseProductsGrid}
                columns={
                  purchaseProductsGridColumns(
                    currencies,
                    taxes,
                    activeTab,
                    handleAction,
                  ) as ColumnDef<DataWithId>[]
                }
                data={purchaseProducts}
                gridRequestModel={purchaseProductsGridRequestModel}
                sortingItems={sortingOptions}
                columnsPreferences={preferences}
                preferenceContext={"productReferences"}
                skeletonQuantity={purchaseSummary?.unitsAmount}
                onApplyColumns={onApplyColumnsHandler}
                onDefaultColumns={onResetColumnsHandler}
                onGridRequestChange={handleGridRequestChange}
              >
                <GridItemsFilter
                  items={brands}
                  columnName={t("SectionTitles.Brand")}
                  getId={(item: BrandModel) => item.brandId}
                  getName={(item: BrandModel) => item.brandName}
                />
                <GridItemsFilter
                  items={categories}
                  columnName={t("SectionTitles.Category")}
                  getId={(item: CategoryModel) => item.categoryId}
                  getName={(item: CategoryModel) => item.categoryName}
                />
              </SheGrid>
              <div className={cs.purchaseSummary}>
                <span className={cs.purchaseSummaryTitle}>
                  {t("PurchaseForm.Labels.PurchaseSummary")}
                </span>
                <div className={cs.purchaseSummaryItems}>
                  <div>
                    <span className={cs.purchaseSummaryTitle}>
                      {t("PurchaseForm.Labels.Units")}
                    </span>
                    {!_.isNil(purchaseSummary?.unitsAmount) && (
                      <span className={cs.purchaseSummaryItem}>
                        {`: ${purchaseSummary?.unitsAmount}`}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className={cs.purchaseSummaryTitle}>
                      {t("PurchaseForm.Labels.Expense")}
                    </span>
                    {!_.isNil(purchaseSummary?.expense) && (
                      <span className={cs.purchaseSummaryItem}>
                        {`: ${purchaseSummary?.expense} ${purchaseSummary?.currencyBrief}`}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className={cs.purchaseSummaryTitle}>
                      {t("PurchaseForm.Labels.ProjectedValue")}
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
              <SheGrid
                isLoading={isProductsGridLoading}
                className={cs.purchaseProductsGrid}
                columns={
                  purchaseVariantsGridColumns(
                    currencies,
                    taxes,
                    activeTab,
                    handleAction,
                  ) as ColumnDef<DataWithId>[]
                }
                data={variants}
                gridRequestModel={variantsGridRequestModel}
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
                  columnName={t("SectionTitles.Brand")}
                  getId={(item: BrandModel) => item.brandId}
                  getName={(item: BrandModel) => item.brandName}
                />
                <GridItemsFilter
                  items={categories}
                  columnName={t("SectionTitles.Category")}
                  getId={(item: CategoryModel) => item.categoryId}
                  getName={(item: CategoryModel) => item.categoryName}
                />
                <GridTraitsFilter
                  traitOptions={colorsForFilter}
                  traitType="color"
                />
                <GridTraitsFilter
                  traitOptions={sizesForFilter}
                  traitType="size"
                />
                <GridShowItemsFilter context="Deleted" />
              </SheGrid>
            </TabsContent>
          </SheTabs>
        </div>
      </SheProductCard>
    </div>
  );
}
