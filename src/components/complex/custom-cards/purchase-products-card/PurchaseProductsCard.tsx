import { useState } from "react";
import _, { merge } from "lodash";

import { Layers2, Plus, Shirt } from "lucide-react";

import cs from "./PurchaseProductsCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheTabs from "@/components/complex/she-tabs/SheTabs.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import GridItemsFilter from "@/components/complex/grid/filters/grid-items-filter/GridItemsFilter.tsx";
import GridTraitsFilter from "@/components/complex/grid/filters/grid-traits-filter/GridTraitsFilter.tsx";
import GridShowItemsFilter from "@/components/complex/grid/filters/grid-show-deleted-filter/GridShowItemsFilter.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { purchaseProductsGridColumns } from "@/components/complex/grid/custom-grids/purchase-products-grid/PurchaseProductsGridColumns.tsx";
import { purchaseVariantsGridColumns } from "@/components/complex/grid/custom-grids/purchase-variants-grid/PurchaseVariantsGridColumns.tsx";
import { PurchaseProductsPageSliceActions as actions } from "@/state/slices/PurchaseProductsPageSlice.ts";
import { AppSliceActions as appActions } from "@/state/slices/AppSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IPurchaseProductsCard } from "@/const/interfaces/complex-components/custom-cards/IPurchaseProductsCard.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";

export default function PurchaseProductsCard({
  isLoading,
  isPurchaseProductsGridLoading,
  isProductsGridLoading,
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
  purchaseId,
  onAction,
}: IPurchaseProductsCard) {
  // ==================================================================== STATE MANAGEMENT
  const [activeTab, setActiveTab] = useState("purchaseProducts");

  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  const productsService = useProductsPageService();
  const dispatch = useAppDispatch();
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);

  // ==================================================================== EVENT HANDLER
  function onTabChangeHandler(value: string) {
    if (value === activeTab) return;
    setActiveTab(value);
    dispatch(actions.refreshActiveTab(value));
    if (value === "purchaseProducts") {
      onAction("refreshPurchaseProductsTab", purchaseId);
    }
    if (value === "connectProducts") {
      onAction("refreshConnectProductsTab", purchaseId);
    }
  }

  function onActionHandler(actionType: string, payload?: any) {
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

  function onApplyColumnsHandler(model: PreferencesModel) {
    const modifiedModel = merge({}, appState.preferences, model);
    dispatch(appActions.refreshPreferences(modifiedModel));
    productsService.updateUserPreferencesHandler(modifiedModel);
  }

  function onResetColumnsHandler() {
    productsService.resetUserPreferencesHandler("products");
  }

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.purchaseProductsCard}
      title="Manage Purchases"
      titleTransKey="CardTitles.ManagePurchases"
      showHeader={false}
      isLoading={isLoading}
    >
      <div className={cs.purchaseProductsCardContent}>
        <SheTabs
          defaultValue="purchaseProducts"
          onValueChange={onTabChangeHandler}
        >
          <div className={cs.tabItemsWrapper}>
            <TabsList className={cs.tabItems}>
              <div>
                <TabsTrigger
                  className={cs.tabItemTrigger}
                  value="purchaseProducts"
                >
                  <div className={cs.tabBlock}>
                    <Shirt size="16" />{" "}
                    {translate("TabLabels.PurchaseProducts")}
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  className={cs.tabItemTrigger}
                  value="connectProducts"
                >
                  <div className={cs.tabBlock}>
                    <Layers2 size="16" />
                    {translate("TabLabels.ConnectProducts")}
                  </div>
                </TabsTrigger>
              </div>
              <SheButton
                value="Create Product"
                valueTransKey="ProductActions.CreateProduct"
                icon={Plus}
                variant="info"
                onClick={() => onAction("openCreateProductCard")}
              />
            </TabsList>
          </div>
          <TabsContent value="purchaseProducts">
            <SheGrid
              isLoading={isPurchaseProductsGridLoading}
              className={cs.purchaseProductsGrid}
              columns={purchaseProductsGridColumns(
                currencies,
                taxes,
                activeTab,
                onActionHandler,
              )}
              data={purchaseProductsGridRequestModel.items}
              gridRequestModel={purchaseProductsGridRequestModel}
              sortingItems={sortingOptions}
              columnsPreferences={preferences}
              preferenceContext={"productReferences"}
              skeletonQuantity={purchaseSummary?.unitsAmount}
              onApplyColumns={onApplyColumnsHandler}
              onDefaultColumns={onResetColumnsHandler}
              onGridRequestChange={(updates) =>
                onAction("gridRequestChange", { updates, activeTab })
              }
            >
              <GridItemsFilter
                items={brands as any}
                columnName={translate("SectionTitles.Brand")}
                getId={(item: BrandModel) => item.brandId}
                getName={(item: BrandModel) => item.brandName}
                selected={purchaseProductsGridRequestModel?.filter?.brands}
              />
              <GridItemsFilter
                items={categories as any}
                columnName={translate("SectionTitles.Category")}
                getId={(item: CategoryModel) => item.categoryId}
                getName={(item: CategoryModel) => item.categoryName}
                selected={purchaseProductsGridRequestModel?.filter?.categories}
              />
            </SheGrid>
            <div className={cs.purchaseSummary}>
              <span className={cs.purchaseSummaryTitle}>
                {translate("PurchaseForm.Labels.PurchaseSummary")}
              </span>
              <div className={cs.purchaseSummaryItems}>
                <div>
                  <span className={cs.purchaseSummaryTitle}>
                    {translate("PurchaseForm.Labels.Units")}
                  </span>
                  {!_.isNil(purchaseSummary?.unitsAmount) && (
                    <span className={cs.purchaseSummaryItem}>
                      {`: ${purchaseSummary?.unitsAmount}`}
                    </span>
                  )}
                </div>
                <div>
                  <span className={cs.purchaseSummaryTitle}>
                    {translate("PurchaseForm.Labels.Expense")}
                  </span>
                  {!_.isNil(purchaseSummary?.expense) && (
                    <span className={cs.purchaseSummaryItem}>
                      {`: ${purchaseSummary?.expense} ${purchaseSummary?.currencyBrief}`}
                    </span>
                  )}
                </div>
                <div>
                  <span className={cs.purchaseSummaryTitle}>
                    {translate("PurchaseForm.Labels.ProjectedValue")}
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
              columns={purchaseVariantsGridColumns(
                currencies,
                taxes,
                activeTab,
                onActionHandler,
              )}
              data={variantsGridRequestModel.items}
              gridRequestModel={variantsGridRequestModel}
              sortingItems={sortingOptions}
              columnsPreferences={preferences}
              preferenceContext={"productReferences"}
              skeletonQuantity={variantsSkeletonQuantity}
              onApplyColumns={onApplyColumnsHandler}
              onDefaultColumns={onResetColumnsHandler}
              onGridRequestChange={(updates) =>
                onAction("gridRequestChange", { updates, activeTab })
              }
            >
              <GridItemsFilter
                items={brands as any}
                columnName={translate("SectionTitles.Brand")}
                getId={(item: BrandModel) => item.brandId}
                getName={(item: BrandModel) => item.brandName}
                selected={variantsGridRequestModel?.filter?.brands}
              />
              <GridItemsFilter
                items={categories as any}
                columnName={translate("SectionTitles.Category")}
                getId={(item: CategoryModel) => item.categoryId}
                getName={(item: CategoryModel) => item.categoryName}
                selected={variantsGridRequestModel?.filter?.categories}
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
    </SheCard>
  );
}
