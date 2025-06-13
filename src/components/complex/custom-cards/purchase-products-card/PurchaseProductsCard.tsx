import { Layers2, Plus, Shirt } from "lucide-react";
import { useState } from "react";

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
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { purchaseProductsGridColumns } from "@/components/complex/grid/purchase-products-grid/PurchaseProductsGridColumns.tsx";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { merge } from "lodash";
import { AppSliceActions as appActions } from "@/state/slices/AppSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import GridItemsFilter from "@/components/complex/grid/grid-items-filter/GridItemsFilter.tsx";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export default function PurchaseProductsCard({
  products,
  purchaseProducts,
  purchaseProductsGridModel,
  productsGridModel,
  preferences,
  sortingOptions,
  brands,
  categories,
  purchaseProductsSkeletonQuantity,
  productsSkeletonQuantity,
}: IPurchaseProductsCard) {
  console.log("PROD", purchaseProducts);
  console.log("GRID MODEL", purchaseProductsGridModel);
  console.log();
  console.log();
  console.log();

  const [activeTab, setActiveTab] = useState("purchaseProducts");
  const productsService = useProductsPageService();
  const dispatch = useAppDispatch();
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );

  const purchaseProductsColumns = purchaseProductsGridColumns(onAction);
  const productsColumns = purchaseProductsGridColumns(onAction);

  function handleTabChange(value: string) {
    if (value === activeTab) return;
    setActiveTab(value);
    dispatch(actions.refreshActiveTab(value));
  }

  function onAction(actionType: string, _payload?: any) {
    switch (actionType) {
      case "CreateProduct":
        break;
    }
  }

  function handleGridRequestChange(updates: GridRequestModel) {
    if (updates.brands || updates.categories || updates.filter) {
      if (activeTab === "purchaseProducts") {
        dispatch(
          actions.refreshPurchasesProductsGridRequestModel({
            ...state.purchasesProductsGridRequestModel,
            currentPage: 1,
            ...updates,
          }),
        );
      } else if (activeTab === "connectProducts") {
        // dispatch(
        //   actions.refreshVariantsGridRequestModel({
        //     ...state.variantsGridRequestModel,
        //     currentPage: 1,
        //     ...updates,
        //   }),
        // );
      }
    } else {
      if (activeTab === "purchaseProducts") {
        dispatch(
          actions.refreshPurchasesProductsGridRequestModel({
            ...state.purchasesProductsGridRequestModel,
            ...updates,
          }),
        );
      } else if (activeTab === "connectProducts") {
        // dispatch(
        //   actions.refreshVariantsGridRequestModel({
        //     ...state.variantsGridRequestModel,
        //     ...updates,
        //   }),
        // );
      }
    }
  }

  function onBrandSelectHandler(selectedIds: number[]) {
    handleGridRequestChange({ brands: selectedIds });
  }

  function onCategorySelectHandler(selectedIds: number[]) {
    handleGridRequestChange({ categories: selectedIds });
  }

  function onApplyColumnsHandler(model: PreferencesModel) {
    const modifiedModel = merge({}, appState.preferences, model);
    dispatch(appActions.refreshPreferences(modifiedModel));
    productsService.updateUserPreferencesHandler(modifiedModel);
  }

  function onResetColumnsHandler() {
    productsService.resetUserPreferencesHandler();
  }

  return (
    <SheProductCard
      className={cs.purchaseProductsCard}
      showHeader={false}
      title={"Manage Purchases"}
      width="1200px"
    >
      <div className={cs.productsPageContent}>
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
                  {/*<SheButton/>*/}
                  <div className={cs.tabBlock}>
                    <Layers2 size="16" />
                    Connect Products
                  </div>
                </TabsTrigger>
              </div>
              <SheButton
                icon={Plus}
                variant="ghost"
                onClick={() => onAction("CreateProduct")}
                value="Create Product"
              />
            </TabsList>
          </div>
          <TabsContent value="purchaseProducts">
            <DndGridDataTable
              columns={purchaseProductsColumns}
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
                onSelectionChange={onBrandSelectHandler}
                getId={(item: BrandModel) => item.brandId}
                getName={(item: BrandModel) => item.brandName}
              />
              <GridItemsFilter
                items={categories}
                columnName={"Categories"}
                onSelectionChange={onCategorySelectHandler}
                getId={(item: CategoryModel) => item.categoryId}
                getName={(item: CategoryModel) => item.categoryName}
              />
            </DndGridDataTable>
          </TabsContent>
          <TabsContent value="connectProducts">
            <DndGridDataTable
              columns={productsColumns}
              data={products}
              gridModel={productsGridModel}
              sortingItems={sortingOptions}
              columnsPreferences={preferences}
              preferenceContext={"productReferences"}
              skeletonQuantity={productsSkeletonQuantity}
              onApplyColumns={onApplyColumnsHandler}
              onDefaultColumns={onResetColumnsHandler}
              onGridRequestChange={handleGridRequestChange}
            >
              <GridItemsFilter
                items={brands}
                columnName={"Brands"}
                onSelectionChange={onBrandSelectHandler}
                getId={(item: BrandModel) => item.brandId}
                getName={(item: BrandModel) => item.brandName}
              />
              <GridItemsFilter
                items={categories}
                columnName={"Categories"}
                onSelectionChange={onCategorySelectHandler}
                getId={(item: CategoryModel) => item.categoryId}
                getName={(item: CategoryModel) => item.categoryName}
              />
            </DndGridDataTable>
          </TabsContent>
        </SheTabs>
      </div>
    </SheProductCard>
  );
}
