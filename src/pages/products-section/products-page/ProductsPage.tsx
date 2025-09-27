import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";

import {
  BadgeCheck,
  Layers2,
  Plus,
  Receipt,
  ReceiptEuro,
  Shirt,
} from "lucide-react";

import cs from "./ProductsPage.module.scss";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PurchasesGridColumns } from "@/components/complex/grid/custom-grids/purchases-grid/PurchasesGridColumns.tsx";
import { ProductsGridColumns } from "@/components/complex/grid/custom-grids/products-grid/ProductsGridColumns.tsx";
import { VariantsGridColumns } from "@/components/complex/grid/custom-grids/variants-grid/VariantsGridColumns.tsx";
import { GridDateRangeFilter } from "@/components/complex/grid/filters/grid-date-range-filter/GridDateRangeFilter.tsx";
import { GridValueFilter } from "@/components/complex/grid/filters/grid-value-filter/GridValueFilter.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheTabs from "@/components/complex/she-tabs/SheTabs.tsx";
import GridItemsFilter from "@/components/complex/grid/filters/grid-items-filter/GridItemsFilter.tsx";
import GridShowItemsFilter from "@/components/complex/grid/filters/grid-show-deleted-filter/GridShowItemsFilter.tsx";
import GridTraitsFilter from "@/components/complex/grid/filters/grid-traits-filter/GridTraitsFilter.tsx";
import { ProductsPageSliceActions as actions } from "@/state/slices/ProductsPageSlice.ts";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";

export function ProductsPage() {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();
  const { state, appState, dispatch, ...service } = useProductsPageService();
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (state.activeTab === "products") {
      service.getTheProductsForGridHandler(state.productsGridRequestModel);
    } else if (state.activeTab === "variants") {
      service.getVariantsForGridHandler(state.variantsGridRequestModel);
    } else if (state.activeTab === "purchases") {
      service.getListOfPurchasesForGridHandler(state.purchasesGridRequestModel);
    }
    dispatch(actions.resetSelectedVariant());
  }, [state.activeTab, dispatch]);

  useEffect(() => {
    if (state.brands.length === 0) {
      service.getBrandsForFilterHandler();
    }
    if (state.categories.length === 0) {
      service.getCategoriesForFilterHandler();
    }
    if (state.suppliers.length === 0) {
      service.getListOfSuppliersHandler();
    }
    if (state.sizesForFilter.length === 0 || state.colorsForFilter.length === 0)
      service.getTraitsForFilterHandler();
  }, []);

  // ==================================================================== EVENT HANDLERS
  function onAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "activateProduct":
        service.activateProductHandler(payload);
        break;
      case "activateVariant":
        service.activateVariantActionHandler(payload);
        break;
      case "manageProduct":
        service.manageProductActionHandler(payload);
        break;
      case "manageVariant":
        service.manageVariantActionHandler(
          payload.variantId,
          payload.productId,
        );
        break;
      case "managePurchase":
        service.managePurchaseActionHandler(payload?.purchaseId);
        break;
      case "deleteProduct":
        service.deleteProductActionHandler(payload);
        break;
      case "deleteVariant":
        service.deleteVariantActionHandler(payload);
        break;
      case "deletePurchase":
        service.deletePurchaseActionHandler(payload);
        break;
      case "addProduct":
        service.addProductActionHandler();
        break;
      case "reportPurchase":
        service.reportPurchaseActionHandler();
        break;
      case "gridRequestChange":
        service.gridRequestChangeHandler(payload);
        break;
      case "applyColumns":
        service.applyColumnsActionHandler(payload);
        break;
      case "resetColumns":
        service.resetColumnsActionHandler();
        break;
      case "tabChange":
        service.tabChangeActionHandler(payload);
        break;
    }
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.ProductsPage}>
      <div className={cs.pageHeader}>
        <span className="she-title">{translate("PageTitles.Products")}</span>
        {state.activeTab === "purchases" ? (
          <div>
            <SheButton
              value={translate("SupplierActions.ReportPurchase")}
              icon={Plus}
              variant="info"
              onClick={() => onAction("reportPurchase")}
            />
          </div>
        ) : (
          <div>
            <SheButton
              icon={Plus}
              variant="info"
              onClick={() => onAction("addProduct")}
              value={translate("ProductActions.AddProduct")}
            />
            {/*Commented until future notices*/}
            {/*<SheButton*/}
            {/*  icon={Download}*/}
            {/*  variant="outline"*/}
            {/*  onClick={handleImportProducts}*/}
            {/*  value="Import Products"*/}
            {/*/>*/}
            {/*<SheButton*/}
            {/*  icon={Columns3Icon}*/}
            {/*  variant="outline"*/}
            {/*  onClick={handleConfigure}*/}
            {/*  value="Configure"*/}
            {/*/>*/}
          </div>
        )}
      </div>
      <div className={cs.productsPageContent}>
        <SheTabs
          defaultValue={state.activeTab}
          onValueChange={(value: string) => onAction("tabChange", value)}
        >
          <div className={cs.tabItemsWrapper}>
            <TabsList className={cs.tabItems}>
              <TabsTrigger className={cs.tabItemTrigger} value="products">
                <div className={cs.tabBlock}>
                  <Shirt size="16" /> {translate("TabContent.Products")}
                </div>
              </TabsTrigger>
              <TabsTrigger className={cs.tabItemTrigger} value="variants">
                <div className={cs.tabBlock}>
                  <Layers2 size="16" /> {translate("TabContent.Variants")}
                </div>
              </TabsTrigger>
              <TabsTrigger className={cs.tabItemTrigger} value="purchases">
                <div className={cs.tabBlock}>
                  <Receipt size="16" /> {translate("TabContent.Purchases")}
                </div>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="products" className={cs.productsPageTabContext}>
            <SheGrid
              gridRequestModel={state.productsGridRequestModel}
              columns={ProductsGridColumns(onAction)}
              sortingItems={sortingItems}
              columnsPreferences={appState.preferences}
              preferenceContext={"productReferences"}
              isLoading={state.isLoading}
              skeletonQuantity={10}
              onApplyColumns={(model) => onAction("applyColumns", model)}
              onDefaultColumns={() => onAction("resetColumns")}
              onGridRequestChange={(updates) =>
                onAction("gridRequestChange", updates)
              }
            >
              <GridItemsFilter
                items={state.brands}
                columnName={"Brands"}
                getId={(item: BrandModel) => item.brandId}
                getName={(item: BrandModel) => item.brandName}
                selected={state.productsGridRequestModel?.filter?.brands}
              />
              <GridItemsFilter
                items={state.categories}
                columnName={"Categories"}
                getId={(item: CategoryModel) => item.categoryId}
                getName={(item: CategoryModel) => item.categoryName}
                selected={state.productsGridRequestModel?.filter?.categories}
              />
              <GridShowItemsFilter context="Deleted" />
            </SheGrid>
          </TabsContent>
          <TabsContent value="variants" className={cs.productsPageTabContext}>
            <SheGrid
              gridRequestModel={state.variantsGridRequestModel}
              columns={VariantsGridColumns(onAction) as ColumnDef<DataWithId>[]}
              sortingItems={sortingItems}
              columnsPreferences={appState.preferences}
              preferenceContext={"variantReferences"}
              isLoading={state.isLoading}
              skeletonQuantity={10}
              onApplyColumns={(model) => onAction("applyColumns", model)}
              onDefaultColumns={() => onAction("resetColumns")}
              onGridRequestChange={(updates) =>
                onAction("gridRequestChange", updates)
              }
            >
              <GridItemsFilter
                items={state.brands}
                columnName={"Brands"}
                getId={(item: BrandModel) => item.brandId}
                getName={(item: BrandModel) => item.brandName}
                selected={state.variantsGridRequestModel?.filter?.brands}
              />
              <GridItemsFilter
                items={state.categories}
                columnName={"Categories"}
                getId={(item: CategoryModel) => item.categoryId}
                getName={(item: CategoryModel) => item.categoryName}
                selected={state.variantsGridRequestModel?.filter?.categories}
              />
              <GridTraitsFilter
                traitOptions={state.colorsForFilter}
                traitType="color"
              />
              <GridTraitsFilter
                traitOptions={state.sizesForFilter}
                traitType="size"
              />
              <GridShowItemsFilter context="Deleted" />
            </SheGrid>
          </TabsContent>
          <TabsContent value="purchases" className={cs.productsPageTabContext}>
            <SheGrid
              gridRequestModel={state.purchasesGridRequestModel}
              columns={
                PurchasesGridColumns(onAction) as ColumnDef<DataWithId>[]
              }
              sortingItems={sortingItems}
              columnsPreferences={appState.preferences}
              preferenceContext={"purchaseReferences"}
              isLoading={state.isLoading}
              skeletonQuantity={10}
              onApplyColumns={(model) => onAction("applyColumns", model)}
              onDefaultColumns={() => onAction("resetColumns")}
              onGridRequestChange={(updates) =>
                onAction("gridRequestChange", updates)
              }
            >
              <GridItemsFilter
                items={state.suppliers}
                columnName={"Suppliers"}
                icon={BadgeCheck}
                getId={(item: SupplierModel) => item.supplierId}
                getName={(item: SupplierModel) => item.supplierName}
                selected={state.purchasesGridRequestModel?.filter?.suppliers}
              />
              <GridDateRangeFilter />
              <GridItemsFilter
                items={state.brands}
                columnName={"Brands"}
                icon={BadgeCheck}
                getId={(item: BrandModel) => item.brandId}
                getName={(item: BrandModel) => item.brandName}
                selected={state.purchasesGridRequestModel?.filter?.brands}
              />
              <GridValueFilter
                icon={ReceiptEuro}
                placeholder="Value from"
                fieldKey="valueFrom"
              />
              <GridValueFilter
                icon={ReceiptEuro}
                placeholder="Value to"
                fieldKey="valueTo"
              />
            </SheGrid>
          </TabsContent>
        </SheTabs>
      </div>
    </div>
  );
}
