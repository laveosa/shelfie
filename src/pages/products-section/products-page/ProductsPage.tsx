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
import { ProductsFakeData } from "@/components/complex/grid/products-grid/FakeData.ts";
import { ProductsGridColumns } from "@/components/complex/grid/products-grid/ProductsGridColumns.tsx";
import { GridDataTable } from "@/components/complex/grid/grid-data-table/GridDataTable.tsx";
import { GridModel } from "@/const/models/GridModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { ProductCategoryModel } from "@/const/models/ProductCategoryModel.ts";
import { ProductsGridRequestModel } from "@/const/models/ProductsGridRequestModel.ts";
import { ItemFilter } from "@/components/complex/grid/item-filter/ItemFilter.tsx";

//TODO Replace after we will have API to receiving actual data
const productsData = ProductsFakeData;
// const variantsData = getVariantsFakeData();
// const purchasesData = getPurchasesFakeData();

const BrandData = [
  {
    brandId: 1,
    brandName: "one",
  },
  {
    brandId: 2,
    brandName: "two",
  },
  {
    brandId: 3,
    brandName: "three",
  },
];

export function ProductsPage() {
  const service = useProductsPageService();
  const gridModel: ProductsGridRequestModel = {};

  useEffect(() => {
    service.getTheProductsForGridHandler(gridModel).then((res: GridModel) => {
      console.log("RES", res);
    });
    service.getBrandsForFilterHandler().then((res: BrandModel[]) => {
      console.log("BRANDS", res);
    });
    service
      .getCategoriesForFilterHandler()
      .then((res: ProductCategoryModel[]) => {
        console.log("CATEGORIES", res);
      });
    // service.getUserPreferencesHandler().then((res: PreferencesModel) => {
    //   storageService.setLocalStorage(StorageKeyEnum.PREFERENCES, res);
    // });
  }, []);

  function handleAddProduct() {}

  function handleImportProducts() {}

  function handleConfigure() {}

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
              data={productsData.items}
              gridModel={productsData}
            >
              <ItemFilter filteredColumn={"brand"} data={BrandData} />
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
