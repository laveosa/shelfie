import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { merge } from "lodash";
import {
  BadgeCheck,
  CalendarRange,
  Columns3Icon,
  Download,
  Layers2,
  Plus,
  Receipt,
  ReceiptEuro,
  Shirt,
} from "lucide-react";

import cs from "./ProductsPage.module.scss";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SheTabs from "@/components/complex/she-tabs/SheTabs.tsx";
import { productsGridColumns } from "@/components/complex/grid/products-grid/ProductsGridColumns.tsx";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import GridItemsFilter from "@/components/complex/grid/grid-items-filter/GridItemsFilter.tsx";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { IProductsPageSlice } from "@/const/interfaces/store-slices/IProductsPageSlice.ts";
import { ProductsPageSliceActions as actions } from "@/state/slices/ProductsPageSlice.ts";
import { AppSliceActions as appActions } from "@/state/slices/AppSlice.ts";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { variantsGridColumns } from "@/components/complex/grid/variants-grid/VariantsGridColumns.tsx";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";
import { useToast } from "@/hooks/useToast.ts";
import { purchasesGridColumns } from "@/components/complex/grid/purchases-grid/PurchasesGridColumns.tsx";
import { SupplierModel } from "@/const/models/SupplierModel.ts";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

export function ProductsPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PRODUCTS);
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const service = useProductsPageService();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("products");
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (activeTab === "products") {
      service
        .getTheProductsForGridHandler(state.productsGridRequestModel, true)
        .then((res) => {
          dispatch(actions.refreshProductsGridModel(res));
          dispatch(actions.refreshProducts(res.items));
        });
    } else if (activeTab === "variants") {
      service
        .getVariantsForGridHandler(state.variantsGridRequestModel)
        .then((res) => {
          dispatch(actions.refreshVariantsGridModel(res));
          dispatch(actions.refreshVariants(res.items));
        });
    } else if (activeTab === "purchases") {
      Promise.all([
        service.getListOfPurchasesForGridHandler(
          state.purchasesGridRequestModel,
        ),
        service.getListOfAllSuppliersHandler(),
      ]).then(([model, suppliers]) => {
        dispatch(actions.refreshPurchasesGridModel(model));
        dispatch(actions.refreshPurchases(model.items));
        dispatch(actions.refreshSuppliers(suppliers));
      });
    }
    dispatch(actions.resetSelectedVariant());
  }, [
    state.productsGridRequestModel,
    state.variantsGridRequestModel,
    state.purchasesGridRequestModel,
    activeTab,
    dispatch,
  ]);

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

  useEffect(() => {
    if (state.brands.length === 0) {
      service.getBrandsForFilterHandler().then((res) => {
        dispatch(actions.refreshBrands(res));
      });
    }
    if (state.categories.length === 0) {
      service.getCategoriesForFilterHandler().then((res) => {
        dispatch(actions.refreshCategories(res));
      });
    }
    if (state.sortingOptions.length === 0) {
      service.getSortingOptionsForGridHandler().then((res) => {
        dispatch(actions.refreshSortingOptions(res));
      });
    }
  }, []);

  const onAction = (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    rowData?: any,
    _rowOriginal?: any,
  ) => {
    setLoadingRow(rowId, true);

    switch (actionType) {
      case "image":
        break;
      case "manage":
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
      case "delete":
        service.deleteProductHandler(rowData.original.productId).then((res) => {
          if (res) {
            dispatch(actions.setIsLoading(true));
            service
              .getTheProductsForGridHandler(
                state.productsGridRequestModel,
                true,
              )
              .then((res) => {
                dispatch(actions.setIsLoading(false));
                dispatch(actions.refreshProductsGridModel(res));
                dispatch(actions.refreshProducts(res.items));
              });
            addToast({
              text: "Product deleted successfully",
              type: "success",
            });
          } else {
            addToast({
              text: res.error.message,
              type: "error",
            });
          }
        });
        break;
      case "activateVariant":
        console.log(`Activating variant ${rowId}`);
        break;
      case "manageVariant":
        service.getVariantDetailsHandler(rowData.variantId).then((res) => {
          dispatch(actions.refreshSelectedVariant(res));
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
  };

  const productsColumns = productsGridColumns(onAction, activeStates);
  const variantsColumns = variantsGridColumns(onAction);
  const purchasesColumns = purchasesGridColumns(onAction);

  function handleAddProduct() {
    navigate(`${ApiUrlEnum.PRODUCTS}${ApiUrlEnum.PRODUCT_BASIC_DATA}`);
  }

  function handleImportProducts() {}

  function handleConfigure() {}

  function handleReportPurchase() {}

  function handleGridRequestChange(updates: GridRequestModel) {
    if (updates.brands || updates.categories) {
      if (activeTab === "products") {
        dispatch(
          actions.refreshProductsGridRequestModel({
            ...state.productsGridRequestModel,
            currentPage: 1,
            ...updates,
          }),
        );
      } else if (activeTab === "variants") {
        dispatch(
          actions.refreshVariantsGridRequestModel({
            ...state.variantsGridRequestModel,
            currentPage: 1,
            ...updates,
          }),
        );
      }
    } else {
      if (activeTab === "products") {
        dispatch(
          actions.refreshProductsGridRequestModel({
            ...state.productsGridRequestModel,
            ...updates,
          }),
        );
      } else if (activeTab === "variants") {
        dispatch(
          actions.refreshVariantsGridRequestModel({
            ...state.variantsGridRequestModel,
            ...updates,
          }),
        );
      } else if (activeTab === "purchases") {
        dispatch(
          actions.refreshPurchasesGridRequestModel({
            ...state.purchasesGridRequestModel,
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

  function onSupplierSelectHandler(selectedIds: number[]) {
    handleGridRequestChange({ categories: selectedIds });
  }

  function onApplyColumnsHandler(model: PreferencesModel) {
    const modifiedModel = merge({}, appState.preferences, model);
    dispatch(appActions.refreshPreferences(modifiedModel));
    service.updateUserPreferencesHandler(modifiedModel);
  }

  function onResetColumnsHandler() {
    service.resetUserPreferencesHandler();
  }

  function handleTabChange(value: string) {
    if (value === activeTab) return;
    setActiveTab(value);
  }

  return (
    <div id={cs.ProductsPage}>
      <div className={cs.productsPageHeader}>
        <div className="she-title">Products</div>
        {activeTab === "purchases" ? (
          <div className={cs.headerButtonBlock}>
            <SheButton
              icon={Plus}
              variant="outline"
              size="sm"
              onClick={handleReportPurchase}
              value="Report Purchase"
            />
          </div>
        ) : (
          <div className={cs.headerButtonBlock}>
            <SheButton
              icon={Plus}
              variant="outline"
              size="sm"
              onClick={handleAddProduct}
              value="Add Product"
            />
            <SheButton
              icon={Download}
              variant="outline"
              size="sm"
              onClick={handleImportProducts}
              value="Import Products"
            />
            <SheButton
              icon={Columns3Icon}
              variant="outline"
              size="sm"
              onClick={handleConfigure}
              value="Configure"
            />
          </div>
        )}
      </div>
      <div className={cs.productsPageContent}>
        <SheTabs defaultValue="products" onValueChange={handleTabChange}>
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
              columns={productsColumns}
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
                onSelectionChange={onBrandSelectHandler}
                getId={(item: BrandModel) => item.brandId}
                getName={(item: BrandModel) => item.brandName}
              />
              <GridItemsFilter
                items={state.categories}
                columnName={"Categories"}
                onSelectionChange={onCategorySelectHandler}
                getId={(item: CategoryModel) => item.categoryId}
                getName={(item: CategoryModel) => item.categoryName}
              />
            </DndGridDataTable>
          </TabsContent>
          <TabsContent value="variants">
            <DndGridDataTable
              isLoading={state.isLoading}
              columns={variantsColumns}
              data={state.variantsGridModel.items}
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
                onSelectionChange={onBrandSelectHandler}
                getId={(item: BrandModel) => item.brandId}
                getName={(item: BrandModel) => item.brandName}
              />
              <GridItemsFilter
                items={state.categories}
                columnName={"Categories"}
                onSelectionChange={onCategorySelectHandler}
                getId={(item: CategoryModel) => item.categoryId}
                getName={(item: CategoryModel) => item.categoryName}
              />
            </DndGridDataTable>
          </TabsContent>
          <TabsContent value="purchases">
            <DndGridDataTable
              isLoading={state.isLoading}
              columns={purchasesColumns}
              data={state.purchasesGridModel.items}
              gridModel={state.purchasesGridModel}
              sortingItems={state.sortingOptions}
              columnsPreferences={appState.preferences}
              preferenceContext={"productReferences"}
              skeletonQuantity={state.purchasesGridRequestModel.pageSize}
              onApplyColumns={onApplyColumnsHandler}
              onDefaultColumns={onResetColumnsHandler}
              onGridRequestChange={handleGridRequestChange}
            >
              <GridItemsFilter
                items={state.suppliers}
                columnName={"Suppliers"}
                icon={BadgeCheck}
                onSelectionChange={onSupplierSelectHandler}
                getId={(item: SupplierModel) => item.id}
                getName={(item: SupplierModel) => item.name}
              />
              <SheDatePicker
                mode="range"
                icon={CalendarRange}
                placeholder="Pick range"
                maxWidth="200px"
              />
              <GridItemsFilter
                items={state.brands}
                columnName={"Brands"}
                icon={BadgeCheck}
                onSelectionChange={onBrandSelectHandler}
                getId={(item: BrandModel) => item.brandId}
                getName={(item: BrandModel) => item.brandName}
              />
              <SheInput
                icon={ReceiptEuro}
                placeholder="Value from"
                maxWidth="200px"
              />
              <SheInput
                icon={ReceiptEuro}
                placeholder="Value to"
                maxWidth="200px"
              />
            </DndGridDataTable>
          </TabsContent>
        </SheTabs>
      </div>
    </div>
  );
}
