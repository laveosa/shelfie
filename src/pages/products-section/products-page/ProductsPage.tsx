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
import GridFilter from "@/components/complex/grid/item-filter/ItemFilter.tsx";

//TODO Replace after we will have API to receiving actual data
// const productsData = ProductsFakeData;
//
// const BrandData = [
//   { brandId: 1, brandName: "one" },
//   { brandId: 2, brandName: "two" },
//   { brandId: 3, brandName: "three" },
// ];
//
// const CategoryData = [
//   { categoryId: 1, categoryName: "C one" },
//   { categoryId: 2, categoryName: "C two" },
//   { categoryId: 3, categoryName: "C three" },
// ];

export function ProductsPage() {
  const service = useProductsPageService();
  const [grid, _setGridModel] = useState<GridModel>({});
  const [gridModel, setGridModel] = useState<ProductsGridRequestModel>({});
  const [brands, setBrands] = useState<BrandModel[]>([]);
  const [categories, setCategories] = useState<ProductCategoryModel[]>([]);

  useEffect(() => {
    service.getTheProductsForGridHandler(gridModel).then((res: GridModel) => {
      console.log("RES", res);
    });

    service.getBrandsForFilterHandler().then((res: BrandModel[]) => {
      setBrands(res);
      console.log("BRANDS", res);
    });

    service
      .getCategoriesForFilterHandler()
      .then((res: ProductCategoryModel[]) => {
        setCategories(res);
        console.log("CATEGORIES", res);
      });
  }, [gridModel]);

  const handleAddProduct = () => {};
  const handleImportProducts = () => {};
  const handleConfigure = () => {};

  const onBrandSelectHandler = (selectedIds: number[]) => {
    setGridModel((prev) => ({
      ...prev,
      brands: selectedIds,
    }));
  };

  const onCategorySelectHandler = (selectedIds: number[]) => {
    setGridModel((prev) => ({
      ...prev,
      categories: selectedIds,
    }));
  };

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
              <GridFilter
                items={brands}
                columnName={"Brands"}
                onSelectionChange={onBrandSelectHandler}
                getId={(item) => item.brandId}
                getName={(item) => item.brandName}
              />

              <GridFilter
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
