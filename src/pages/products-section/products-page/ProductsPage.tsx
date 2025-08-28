import { useEffect, useRef, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { merge } from "lodash";
import {
  BadgeCheck,
  CalendarRange,
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
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import cs from "./ProductsPage.module.scss";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SheTabs from "@/components/complex/she-tabs/SheTabs.tsx";
import { productsGridColumns } from "@/components/complex/grid/products-grid/ProductsGridColumns.tsx";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import GridItemsFilter from "@/components/complex/grid/grid-items-filter/GridItemsFilter.tsx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductsPageSliceActions as actions } from "@/state/slices/ProductsPageSlice.ts";
import { AppSliceActions as appActions } from "@/state/slices/AppSlice.ts";
import { variantsGridColumns } from "@/components/complex/grid/variants-grid/VariantsGridColumns.tsx";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { useToast } from "@/hooks/useToast.ts";
import { purchasesGridColumns } from "@/components/complex/grid/purchases-grid/PurchasesGridColumns.tsx";
import { SupplierModel } from "@/const/models/SupplierModel.ts";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import GridShowItemsFilter from "@/components/complex/grid/grid-show-deleted-filter/GridShowItemsFilter.tsx";
import GridTraitsFilter from "@/components/complex/grid/grid-traits-filter/GridTraitsFilter.tsx";

export function ProductsPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PRODUCTS);
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const service = useProductsPageService();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>({});
  const gridRef = useRef<DndGridRef>(null);
  const { openConfirmationDialog } = useDialogService();

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

  useEffect(() => {
    if (state.productsGridModel?.items?.length > 0) {
      const initialActiveStates = state.productsGridModel.items.reduce(
        (acc, product) => {
          const rowId = product.productId.toString();
          acc[rowId] = product.isActive;
          return acc;
        },
        {},
      );
      setActiveStates(initialActiveStates);
    }
  }, [state.productsGridModel.items]);

  async function onDelete(data) {
    switch (state.activeTab) {
      case "products":
        const confirmedDeleteProduct = await openConfirmationDialog({
          headerTitle: "Delete Product",
          text: `You are about to delete product "${data.row.original.productName}".`,
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmedDeleteProduct) {
        } else {
          data.table.options.meta?.hideRow(data.row.original.id);
          await service
            .deleteProductHandler(data.row.original.productId)
            .then((res) => {
              if (!res.error) {
                addToast({
                  text: "Product deleted successfully",
                  type: "success",
                });
              } else {
                data.table.options.meta?.unhideRow(data.row.original.id);
                addToast({
                  text: res.error.data.detail,
                  type: "error",
                });
              }
            });
        }
        break;
      case "variants":
        const confirmedDeleteVariant = await openConfirmationDialog({
          headerTitle: "Delete Variant",
          text: `You are about to delete variant "${data.row.original.variantName}".`,
          primaryButtonValue: "Delete",
          secondaryButtonValue: "Cancel",
        });

        if (!confirmedDeleteVariant) {
        } else {
          data.table.options.meta?.hideRow(data.row.original.id);
          await service
            .deleteVariantHandler(data.row.original.variantId)
            .then((res) => {
              if (!res.error) {
                addToast({
                  text: "Variant deleted successfully",
                  type: "success",
                });
              } else {
                data.table.options.meta?.unhideRow(data.row.original.id);
                addToast({
                  text: res.error.data.detail,
                  type: "error",
                });
              }
            });
        }
        break;
      case "purchases":
        console.log("DELETE", data);
        break;
    }
  }

  function onAction(
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    rowData?: any,
  ) {
    setLoadingRow(rowId, true);
    switch (actionType) {
      case "image":
        break;
      case "manageProduct":
        dispatch(actions.resetProduct());
        navigate(
          `${NavUrlEnum.PRODUCTS}${NavUrlEnum.PRODUCT_BASIC_DATA}/${rowData?.productId}`,
        );
        break;
      case "activateProduct":
        {
          const currentActive =
            rowId && rowId in activeStates
              ? activeStates[rowId]
              : rowData?.isActive;

          const newState = !currentActive;

          if (rowId) {
            setActiveStates((prev) => ({
              ...prev,
              [rowId]: newState,
            }));
          }

          service
            .toggleProductActivationHandler(rowData.productId)
            .catch((error) => {
              console.error("Failed to toggle product activation:", error);
              if (rowId) {
                setActiveStates((prev) => ({
                  ...prev,
                  [rowId]: currentActive,
                }));
              }
            });
        }
        break;
      case "activateVariant":
        console.log(`Activating variant ${rowId}`);
        break;
      case "manageVariant":
        service.getVariantDetailsHandler(rowData.variantId).then((res) => {
          dispatch(actions.refreshSelectedVariant(res));
          dispatch(actions.refreshVariantPhotos(res.photos));
          navigate(
            `${NavUrlEnum.PRODUCTS}${NavUrlEnum.MANAGE_VARIANTS}/${rowData?.productId}`,
          );
        });
        break;
      case "deleteVariant":
        console.log(`Delete variant ${rowId}`);
        break;
      case "managePurchase":
        navigate(
          `${NavUrlEnum.PRODUCTS}${NavUrlEnum.SUPPLIER}/${rowData?.purchaseId}`,
        );
        break;
      case "deletePurchase":
        console.log(`Delete purchase ${rowId}`);
        break;
    }

    setLoadingRow(rowId, false);
  }

  function handleAddProduct() {
    navigate(`${NavUrlEnum.PRODUCTS}${NavUrlEnum.PRODUCT_BASIC_DATA}`);
  }

  //Commented until future notices

  // function handleImportProducts() {}
  //
  // function handleConfigure() {}

  function handleReportPurchase() {
    dispatch(actions.resetSelectedPurchase());
    dispatch(actions.resetSelectedSupplier());
    navigate(`${NavUrlEnum.PRODUCTS}${NavUrlEnum.SUPPLIER}/`);
  }

  function handleGridRequestChange(updates: any) {
    if ("searchQuery" in updates || "currentPage" in updates) {
      if (state.activeTab === "products") {
        dispatch(
          actions.refreshProductsGridRequestModel({
            ...state.productsGridRequestModel,
            ...updates,
          }),
        );
      } else if (state.activeTab === "variants") {
        dispatch(
          actions.refreshVariantsGridRequestModel({
            ...state.variantsGridRequestModel,
            ...updates,
          }),
        );
      } else if (state.activeTab === "purchases") {
        dispatch(
          actions.refreshPurchasesGridRequestModel({
            ...state.purchasesGridRequestModel,
            ...updates,
          }),
        );
      }
    } else {
      if (state.activeTab === "products") {
        dispatch(
          actions.refreshProductsGridRequestModel({
            ...state.productsGridRequestModel,
            currentPage: 1,
            filter: {
              ...state.productsGridRequestModel.filter,
              ...updates,
            },
          }),
        );
      } else if (state.activeTab === "variants") {
        dispatch(
          actions.refreshVariantsGridRequestModel({
            ...state.variantsGridRequestModel,
            currentPage: 1,
            filter: {
              ...state.variantsGridRequestModel.filter,
              ...updates,
            },
          }),
        );
      } else if (state.activeTab === "purchases") {
        dispatch(
          actions.refreshPurchasesGridRequestModel({
            ...state.purchasesGridRequestModel,
            currentPage: 1,
            filter: {
              ...state.purchasesGridRequestModel.filter,
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
    service.updateUserPreferencesHandler(modifiedModel);
  }

  function onResetColumnsHandler() {
    service.resetUserPreferencesHandler(state.activeTab);
  }

  function handleTabChange(value: string) {
    if (value === state.activeTab) return;
    dispatch(actions.refreshActiveTab(value));
  }

  return (
    <div id={cs.ProductsPage}>
      <div className={cs.productsPageHeader}>
        <div className="she-title">Products</div>
        {state.activeTab === "purchases" ? (
          <div className={cs.headerButtonBlock}>
            <SheButton
              icon={Plus}
              variant="outline"
              onClick={handleReportPurchase}
              value="Report Purchase"
            />
          </div>
        ) : (
          <div className={cs.headerButtonBlock}>
            <SheButton
              icon={Plus}
              variant="outline"
              onClick={handleAddProduct}
              value="Add Product"
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
        <SheTabs defaultValue={state.activeTab} onValueChange={handleTabChange}>
          <div className={cs.tabItemsWrapper}>
            <TabsList className={cs.tabItems}>
              <TabsTrigger className={cs.tabItemTrigger} value="products">
                <div className={cs.tabBlock}>
                  <Shirt size="16" /> Products
                </div>
              </TabsTrigger>
              <TabsTrigger className={cs.tabItemTrigger} value="variants">
                <div className={cs.tabBlock}>
                  <Layers2 size="16" /> Variants
                </div>
              </TabsTrigger>
              <TabsTrigger className={cs.tabItemTrigger} value="purchases">
                <div className={cs.tabBlock}>
                  <Receipt size="16" /> Purchases
                </div>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="products">
            <DndGridDataTable
              isLoading={state.isLoading}
              ref={gridRef}
              columns={
                productsGridColumns(
                  onAction,
                  onDelete,
                  activeStates,
                ) as ColumnDef<DataWithId>[]
              }
              data={state.productsGridModel.items}
              gridModel={state.productsGridModel}
              sortingItems={state.sortingOptions}
              columnsPreferences={appState.preferences}
              preferenceContext={"productReferences"}
              skeletonQuantity={state.productsGridRequestModel.pageSize}
              onApplyColumns={onApplyColumnsHandler}
              onDefaultColumns={onResetColumnsHandler}
              onGridRequestChange={handleGridRequestChange}
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
          <TabsContent value="variants">
            <DndGridDataTable
              isLoading={state.isLoading}
              ref={gridRef}
              columns={
                variantsGridColumns(
                  onAction,
                  onDelete,
                ) as ColumnDef<DataWithId>[]
              }
              data={state.variants}
              gridModel={state.variantsGridModel}
              sortingItems={state.sortingOptions}
              columnsPreferences={appState.preferences}
              preferenceContext={"variantReferences"}
              skeletonQuantity={state.variantsGridRequestModel.pageSize}
              onApplyColumns={onApplyColumnsHandler}
              onDefaultColumns={onResetColumnsHandler}
              onGridRequestChange={handleGridRequestChange}
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
                gridRequestModel={state.variantsGridRequestModel}
              />
              <GridTraitsFilter
                traitOptions={state.sizesForFilter}
                traitType="size"
                gridRequestModel={state.variantsGridRequestModel}
              />
              <GridShowItemsFilter context="Deleted" />
            </DndGridDataTable>
          </TabsContent>
          <TabsContent value="purchases">
            <DndGridDataTable
              isLoading={state.isLoading}
              ref={gridRef}
              columns={
                purchasesGridColumns(
                  onAction,
                  onDelete,
                ) as ColumnDef<DataWithId>[]
              }
              data={state.purchases}
              gridModel={state.purchasesGridModel}
              sortingItems={state.sortingOptions}
              columnsPreferences={appState.preferences}
              preferenceContext={"purchaseReferences"}
              skeletonQuantity={state.purchasesGridRequestModel.pageSize}
              onApplyColumns={onApplyColumnsHandler}
              onDefaultColumns={onResetColumnsHandler}
              onGridRequestChange={handleGridRequestChange}
            >
              <GridItemsFilter
                items={state.suppliers}
                columnName={"Suppliers"}
                icon={BadgeCheck}
                getId={(item: SupplierModel) => item.supplierId}
                getName={(item: SupplierModel) => item.supplierName}
                selected={state.purchasesGridModel.filter?.suppliers}
              />
              <SheDatePicker
                mode="range"
                icon={CalendarRange}
                placeholder="Pick range"
                maxWidth="200px"
                showClearBtn
                onSelectDate={(value) => {
                  if (value) {
                    handleGridRequestChange({
                      dateTo: value.to.toISOString(),
                      dateFrom: value.from.toISOString(),
                    });
                  } else {
                    handleGridRequestChange({
                      dateTo: null,
                      dateFrom: null,
                    });
                  }
                }}
              />
              <GridItemsFilter
                items={state.brands}
                columnName={"Brands"}
                icon={BadgeCheck}
                getId={(item: BrandModel) => item.brandId}
                getName={(item: BrandModel) => item.brandName}
              />
              <SheInput
                icon={ReceiptEuro}
                placeholder="Value from"
                maxWidth="200px"
                showClearBtn
                onDelay={(value: number) =>
                  handleGridRequestChange({ valueFrom: value })
                }
                onClear={() => handleGridRequestChange({ valueFrom: null })}
              />
              <SheInput
                icon={ReceiptEuro}
                placeholder="Value to"
                maxWidth="200px"
                showClearBtn
                onDelay={(value: number) => {
                  handleGridRequestChange({ valueTo: value });
                }}
                onClear={() => handleGridRequestChange({ valueTo: null })}
              />
            </DndGridDataTable>
          </TabsContent>
        </SheTabs>
      </div>
    </div>
  );
}
