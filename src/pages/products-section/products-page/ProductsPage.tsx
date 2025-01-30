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
import { ProductsGridRequestModel } from "@/const/models/ProductsGridRequestModel.ts";
import GridItemsFilter from "@/components/complex/grid/grid-items-filter/GridItemsFilter.tsx";
import GridItemsSorting from "@/components/complex/grid/grid-items-sorting/GridItemsSorting.tsx";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";

export function ProductsPage() {
  const service = useProductsPageService();
  const [grid, _setGridModel] = useState<GridModel>({ pager: {}, items: [] });
  const [gridModel, setGridModel] = useState<ProductsGridRequestModel>({});
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [categories, setCategories] = useState<ProductCategoryModel[]>([]);
  const [sortingOptions, setSortingOptions] = useState<GridSortingModel[]>([]);

  useEffect(() => {
    service.getTheProductsForGridHandler(gridModel).then((res: GridModel) => {
      console.log("Products", res);
    });

    service.getBrandsForFilterHandler().then((res: BrandModel[]) => {
      setBrands(res);
      console.log("Brands", res);
    });

    service
      .getCategoriesForFilterHandler()
      .then((res: ProductCategoryModel[]) => {
        setCategories(res);
        console.log("Categories", res);
      });

    service
      .getSortingOptionsForGridHandler()
      .then((res: GridSortingModel[]) => {
        setSortingOptions(res); // Corrected line
        console.log("Sorting Options", res);
      });
  }, [gridModel]);

  function handleAddProduct() {}

  function handleImportProducts() {}

  function handleConfigure() {}

  function onBrandSelectHandler(selectedIds: number[]) {
    setGridModel((prev) => ({
      ...prev,
      brands: selectedIds,
    }));
  }

  function onCategorySelectHandler(selectedIds: number[]) {
    setGridModel((prev) => ({
      ...prev,
      categories: selectedIds,
    }));
  }

  function onSortingOptionSelectHandler(value: string) {
    setGridModel((prev) => ({
      ...prev,
      sortOption: value,
    }));
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
              data={grid.items}
              gridModel={grid}
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
              <GridItemsSorting
                items={sortingOptions}
                onSelectionChange={onSortingOptionSelectHandler}
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
