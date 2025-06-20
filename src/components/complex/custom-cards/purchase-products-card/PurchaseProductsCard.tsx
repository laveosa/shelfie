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
import { ProductsPageSliceActions as productsActions } from "@/state/slices/ProductsPageSlice.ts";
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
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { purchaseVariantsGridColumns } from "@/components/complex/grid/purchase-variants-grid/PurchaseVariantsGridColumns.tsx";

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
  purchaseProductsSkeletonQuantity,
  variantsSkeletonQuantity,
  currencies,
  taxes,
  onAction,
}: IPurchaseProductsCard) {
  const [activeTab, setActiveTab] = useState("purchaseProducts");
  const productsService = useProductsPageService();
  const dispatch = useAppDispatch();
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );
  const productsState = useAppSelector<IProductsPageSlice>(
    StoreSliceEnum.PRODUCTS,
  );

  function handleTabChange(value: string) {
    if (value === activeTab) return;
    setActiveTab(value);
    dispatch(actions.refreshActiveTab(value));
  }

  function handleAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "createProduct":
        onAction("openCreateProductCard");
        break;
      case "addProductToPurchase":
        onAction("addProductToPurchase", payload);
        break;
      case "updatePurchaseProduct":
        onAction("updatePurchaseProduct", payload);
        break;
      case "addVariant":
        onAction("openAddVariantCard", payload.original);
        break;
      case "manageVariant":
        console.log("manageVariant");
        break;
      case "transferToPurchase":
        console.log("transferToPurchase");
        break;
      case "removeFromStock":
        console.log("removeFromStock");
        break;
      case "stockChangeHistory":
        console.log("stockChangeHistory");
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
        dispatch(
          productsActions.refreshVariantsGridRequestModel({
            ...productsState.variantsGridRequestModel,
            currentPage: 1,
            ...updates,
          }),
        );
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
        dispatch(
          productsActions.refreshVariantsGridRequestModel({
            ...productsState.variantsGridRequestModel,
            ...updates,
          }),
        );
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
      loading={isLoading}
      className={cs.purchaseProductsCard}
      showHeader={false}
      title={"Manage Purchases"}
      minWidth="1150px"
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
                  <div className={cs.tabBlock}>
                    <Layers2 size="16" />
                    Connect Products
                  </div>
                </TabsTrigger>
              </div>
              <SheButton
                icon={Plus}
                variant="ghost"
                onClick={() => handleAction("createProduct")}
                value="Create Product"
              />
            </TabsList>
          </div>
          <TabsContent value="purchaseProducts">
            <DndGridDataTable
              isLoading={isPurchaseProductsGridLoading}
              columns={purchaseProductsGridColumns(
                currencies,
                taxes,
                activeTab,
                handleAction,
              )}
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
              isLoading={isProductsGridLoading}
              columns={purchaseVariantsGridColumns(
                currencies,
                taxes,
                activeTab,
                handleAction,
              )}
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
