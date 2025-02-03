import { useEffect, useState } from "react";
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
import { ProductsGridColumns } from "@/components/complex/grid/products-grid/ProductsGridColumns.tsx";
import { GridDataTable } from "@/components/complex/grid/grid-data-table/GridDataTable.tsx";
import { GridModel } from "@/const/models/GridModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { ProductCategoryModel } from "@/const/models/ProductCategoryModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import GridItemsFilter from "@/components/complex/grid/grid-items-filter/GridItemsFilter.tsx";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import useAppService from "@/useAppService.ts";
import { useAppSelector } from "@/utils/hooks/redux.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";

export function ProductsPage() {
  const state = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const service = useProductsPageService();
  const appService = useAppService();
  const [productsGridModel, setProductsGridModel] = useState<GridModel>({
    pager: {},
    items: [],
  });
  const [gridRequestModel, setGridRequestModel] = useState<GridRequestModel>({
    currentPage: 1,
    pageSize: 10,
  });
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [categories, setCategories] = useState<ProductCategoryModel[]>([]);
  const [sortingOptions, setSortingOptions] = useState<GridSortingModel[]>([]);

  useEffect(() => {
    service
      .getTheProductsForGridHandler(gridRequestModel)
      .then((res: GridModel) => {
        setProductsGridModel(res);
      });

    service.getBrandsForFilterHandler().then((res: BrandModel[]) => {
      setBrands(res);
    });

    service
      .getCategoriesForFilterHandler()
      .then((res: ProductCategoryModel[]) => {
        setCategories(res);
      });

    service
      .getSortingOptionsForGridHandler()
      .then((res: GridSortingModel[]) => {
        setSortingOptions(res);
      });

    service.refreshColumnsPreferencesHandler(
      appService.preferences.viewsReferences.productReferences,
    );
  }, [gridRequestModel]);

  function handleAddProduct() {}

  function handleImportProducts() {}

  function handleConfigure() {}

  function handleGridRequestChange(updates: GridRequestModel) {
    setGridRequestModel((prev) => ({
      ...prev,
      ...updates,
    }));
  }

  function onBrandSelectHandler(selectedIds: number[]) {
    setGridRequestModel((prev) => ({
      ...prev,
      brands: selectedIds,
    }));
  }

  function onCategorySelectHandler(selectedIds: number[]) {
    setGridRequestModel((prev) => ({
      ...prev,
      categories: selectedIds,
    }));
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
            <GridDataTable
              columns={ProductsGridColumns}
              data={productsGridModel.items}
              gridModel={productsGridModel}
              sortingItems={sortingOptions}
              columnsPreferences={state.preferences}
              onApplyColumns={onApplyColumnsHandler}
              onDefaultColumns={onResetColumnsHandler}
              onGridRequestChange={handleGridRequestChange}
            >
              <GridItemsFilter
                items={brands}
                columnName={"Brands"}
                onSelectionChange={onBrandSelectHandler}
                getId={(item) => item.brandId}
                getName={(item) => item.brandName}
              />

              <GridItemsFilter
                items={categories}
                columnName={"Categories"}
                onSelectionChange={onCategorySelectHandler}
                getId={(item) => item.categoryId}
                getName={(item) => item.categoryName}
              />
            </GridDataTable>
          </TabsContent>
          <TabsContent value="variants">
            {/*<GridDataTable columns={productsGridColumns} data={variantsData} />*/}
          </TabsContent>
          <TabsContent value="purchases">
            {/*<GridDataTable columns={productsGridColumns} data={purchasesData} />*/}
          </TabsContent>
        </SheTabs>
      </div>
    </div>
  );
}
