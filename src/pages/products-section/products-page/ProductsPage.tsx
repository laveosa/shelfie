import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Columns3Icon,
  Download,
  Layers2,
  Plus,
  Receipt,
  Shirt,
} from "lucide-react";

import cs from "./ProductsPage.module.scss";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SheTabs from "@/components/complex/she-tabs/SheTabs.tsx";
import { productsGridColumns } from "@/components/complex/grid/products-grid/ProductsGridColumns.tsx";
import { GridModel } from "@/const/models/GridModel.ts";
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
import { ProductModel } from "@/const/models/ProductModel.ts";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { ApiUrlEnum } from "@/const/enums/ApiUrlEnum.ts";
import { variantsGridColumns } from "@/components/complex/grid/variants-grid/VariantsGridColumns.tsx";
import { NavUrlEnum } from "@/const/enums/NavUrlEnum.ts";

export function ProductsPage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector<IProductsPageSlice>(StoreSliceEnum.PRODUCTS);
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const service = useProductsPageService();
  const navigate = useNavigate();

  useEffect(() => {
    service
      .getTheProductsForGridHandler(state.gridRequestModel)
      .then((res: GridModel) => {
        dispatch(actions.refreshProductsGridModel(res));
      });
    service
      .getVariantsForGridHandler(state.gridRequestModel)
      .then((res: GridModel) => {
        dispatch(actions.refreshVariantsGridModel(res));
      });
  }, [state.gridRequestModel]);

  useEffect(() => {
    service.getBrandsForFilterHandler();
    service.getCategoriesForFilterHandler();
    service.getSortingOptionsForGridHandler();
  }, []);

  const onAction = (
    actionType: string,
    rowId?: string,
    setLoadingRow?: (rowId: string, loading: boolean) => void,
    rowData?: ProductModel,
  ) => {
    setLoadingRow(rowId, true);
    switch (actionType) {
      case "image":
        console.log(`Image row ${rowId}`);
        break;
      case "manage":
        navigate(
          `${ApiUrlEnum.PRODUCTS}${ApiUrlEnum.PRODUCT_BASIC_DATA}/${rowData?.productId}`,
        );
        break;
      case "active":
        console.log(`Active row ${rowId}`);
        break;
      case "delete":
        console.log(`Deleting row ${rowId}`);
        break;
      case "activateVariant":
        console.log(`Deleting row ${rowId}`);
        break;
      case "manageVariant":
        navigate(
          `${NavUrlEnum.PRODUCTS}${NavUrlEnum.PRODUCT_VARIANTS}/${rowData?.productId}`,
        );
        break;
    }
    setLoadingRow(rowId, false);
  };

  const productsColumns = productsGridColumns(onAction);
  const variantsColumns = variantsGridColumns(onAction);

  function handleAddProduct() {
    navigate(`${ApiUrlEnum.PRODUCTS}${ApiUrlEnum.PRODUCT_BASIC_DATA}`);
  }

  function handleImportProducts() {}

  function handleConfigure() {}

  function handleGridRequestChange(updates: GridRequestModel) {
    dispatch(
      actions.refreshGridRequestModel({
        ...state.gridRequestModel,
        ...updates,
      }),
    );
  }

  function onBrandSelectHandler(selectedIds: number[]) {
    handleGridRequestChange({ brands: selectedIds });
  }

  function onCategorySelectHandler(selectedIds: number[]) {
    handleGridRequestChange({ categories: selectedIds });
  }

  function onApplyColumnsHandler(model: PreferencesModel) {
    service.updateUserPreferencesHandler(model);
  }

  function onResetColumnsHandler() {
    service.resetUserPreferencesHandler();
  }

  return (
    <div id={cs.ProductsPage}>
      <div className={cs.productsPageHeader}>
        <div className="she-title">Products</div>
        <div className={cs.headerButtonBlock}>
          <SheButton
            icon={Plus}
            variant="outline"
            size="sm"
            onClick={handleAddProduct}
          >
            Add Product
          </SheButton>
          <SheButton
            icon={Download}
            variant="outline"
            size="sm"
            onClick={handleImportProducts}
          >
            Import Products
          </SheButton>
          <SheButton
            icon={Columns3Icon}
            variant="outline"
            size="sm"
            onClick={handleConfigure}
          >
            Configure
          </SheButton>
        </div>
      </div>
      <div className={cs.productsPageContent}>
        <SheTabs defaultValue="products">
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
              columns={productsColumns}
              data={state.productsGridModel.items}
              gridModel={state.productsGridModel}
              sortingItems={state.sortingOptions}
              columnsPreferences={appState.preferences}
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
              columns={variantsColumns}
              data={state.variantsGridModel.items}
              gridModel={state.variantsGridModel}
              sortingItems={state.sortingOptions}
              columnsPreferences={appState.preferences}
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
            {/*<GridDataTable columns={productsGridColumns} data={purchasesData} />*/}
          </TabsContent>
        </SheTabs>
      </div>
    </div>
  );
}
