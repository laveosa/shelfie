import { useEffect, useRef } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  BadgeCheck,
  Layers2,
  Plus,
  Receipt,
  ReceiptEuro,
  Shirt,
} from "lucide-react";

import {
  DataWithId,
  DndGridDataTable,
  DndGridRef,
} from "@/components/complex/grid/DndGrid.tsx";
import cs from "./ProductsPage.module.scss";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SheTabs from "@/components/complex/she-tabs/SheTabs.tsx";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import GridItemsFilter from "@/components/complex/grid/filters/grid-items-filter/GridItemsFilter.tsx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductsPageSliceActions as actions } from "@/state/slices/ProductsPageSlice.ts";
import { purchasesGridColumns } from "@/components/complex/grid/custom-grids/purchases-grid/PurchasesGridColumns.tsx";
import { SupplierModel } from "@/const/models/SupplierModel.ts";
import GridShowItemsFilter from "@/components/complex/grid/filters/grid-show-deleted-filter/GridShowItemsFilter.tsx";
import GridTraitsFilter from "@/components/complex/grid/filters/grid-traits-filter/GridTraitsFilter.tsx";
import { ProductsGridColumns } from "@/components/complex/grid/custom-grids/products-grid/ProductsGridColumns.tsx";
import { variantsGridColumns } from "@/components/complex/grid/custom-grids/variants-grid/VariantsGridColumns.tsx";
import { GridDateRangeFilter } from "@/components/complex/grid/filters/grid-date-range-filter/GridDateRangeFilter.tsx";
import { GridValueFilter } from "@/components/complex/grid/filters/grid-value-filter/GridValueFilter.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";

export function ProductsPage() {
  const { translate } = useAppTranslation();
  const dispatch = useAppDispatch();
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PRODUCTS);
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const service = useProductsPageService();
  const gridRef = useRef<DndGridRef>(null);

  useEffect(() => {
    if (state.activeTab === "products") {
      service.getTheProductsForGridHandler(
        state.productsGridRequestModel,
        true,
      );
    } else if (state.activeTab === "variants") {
      service.getVariantsForGridHandler(state.variantsGridRequestModel);
    } else if (state.activeTab === "purchases") {
      service.getListOfPurchasesForGridHandler(state.purchasesGridRequestModel);
    }
    dispatch(actions.resetSelectedVariant());
  }, [
    state.productsGridRequestModel,
    state.variantsGridRequestModel,
    state.purchasesGridRequestModel,
    state.activeTab,
    dispatch,
  ]);

  useEffect(() => {
    if (state.brands.length === 0) {
      service.getBrandsForFilterHandler();
    }
    if (state.categories.length === 0) {
      service.getCategoriesForFilterHandler();
    }
    if (state.sortingOptions.length === 0) {
      service.getSortingOptionsForGridHandler();
    }
    if (state.suppliers.length === 0) {
      service.getListOfSuppliersHandler();
    }
    if (state.sizesForFilter.length === 0 || state.colorsForFilter.length === 0)
      service.getTraitsForFilterHandler();
  }, []);

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

  return (
    <div className={cs.productsPage}>
      <div className={cs.productsPageHeader}>
        <span className="she-title">{translate("PageTitles.Products")}</span>
        <div>
          <SheButton
            icon={Plus}
            variant="info"
            onClick={() =>
              onAction(
                state.activeTab === "purchases"
                  ? "reportPurchase"
                  : "addProduct",
              )
            }
            value={
              state.activeTab === "purchases"
                ? translate("SupplierActions.ReportPurchase", "Report Purchase")
                : translate("ProductActions.AddProduct", "Add Product")
            }
          />
        </div>
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
            <DndGridDataTable
              ref={gridRef}
              isLoading={state.isLoading}
              // isLoading={true}
              // showColumnsHeader={false}
              enableDnd
              columns={ProductsGridColumns(onAction)}
              data={state.productsGridModel.items}
              gridModel={state.productsGridModel}
              gridRequestModel={state.productsGridRequestModel}
              sortingItems={state.sortingOptions}
              columnsPreferences={appState.preferences}
              preferenceContext={"productReferences"}
              skeletonQuantity={state.productsGridRequestModel.pageSize}
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
                selected={state.productsGridModel.filter?.brands}
              />
              <GridItemsFilter
                items={state.categories}
                columnName={"Categories"}
                getId={(item: CategoryModel) => item.categoryId}
                getName={(item: CategoryModel) => item.categoryName}
                selected={state.productsGridModel.filter?.categories}
              />
              <GridShowItemsFilter context="Deleted" />
            </DndGridDataTable>
          </TabsContent>
          <TabsContent value="variants" className={cs.productsPageTabContext}>
            <DndGridDataTable
              isLoading={state.isLoading}
              ref={gridRef}
              columns={variantsGridColumns(onAction) as ColumnDef<DataWithId>[]}
              data={state.variants}
              gridModel={state.variantsGridModel}
              gridRequestModel={state.variantsGridRequestModel}
              sortingItems={state.sortingOptions}
              columnsPreferences={appState.preferences}
              preferenceContext={"variantReferences"}
              skeletonQuantity={state.variantsGridRequestModel.pageSize}
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
                selected={state.variantsGridModel.filter?.brands}
              />
              <GridItemsFilter
                items={state.categories}
                columnName={"Categories"}
                getId={(item: CategoryModel) => item.categoryId}
                getName={(item: CategoryModel) => item.categoryName}
                selected={state.variantsGridModel.filter?.categories}
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
            </DndGridDataTable>
          </TabsContent>
          <TabsContent value="purchases" className={cs.productsPageTabContext}>
            <DndGridDataTable
              isLoading={state.isLoading}
              ref={gridRef}
              columns={
                purchasesGridColumns(onAction) as ColumnDef<DataWithId>[]
              }
              data={state.purchases}
              gridModel={state.purchasesGridModel}
              gridRequestModel={state.purchasesGridRequestModel}
              sortingItems={state.sortingOptions}
              columnsPreferences={appState.preferences}
              preferenceContext={"purchaseReferences"}
              skeletonQuantity={state.purchasesGridRequestModel.pageSize}
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
                selected={state.purchasesGridModel.filter?.suppliers}
              />
              <GridDateRangeFilter />
              <GridItemsFilter
                items={state.brands}
                columnName={"Brands"}
                icon={BadgeCheck}
                getId={(item: BrandModel) => item.brandId}
                getName={(item: BrandModel) => item.brandName}
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
            </DndGridDataTable>
          </TabsContent>
        </SheTabs>
      </div>
    </div>
  );
}
