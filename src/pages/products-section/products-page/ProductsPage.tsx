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
import { useEffect } from "react";
import storageService from "@/utils/services/StorageService.ts";
import { StorageKeyEnum } from "@/const/enums/StorageKeyEnum.ts";

//TODO Replace after we will have API to receiving actual data
const productsData = ProductsFakeData;
// const variantsData = getVariantsFakeData();
// const purchasesData = getPurchasesFakeData();

export function ProductsPage() {
  const service = useProductsPageService();

  //TODO It`s temporary logic needs to be removed when we will receive real model
  const fakePreferences = {
    globalPreferences: {},
    viewsReferences: {
      productReferences: {
        columns: {
          id: false,
          image: false,
          code: true,
          productName: true,
          category: true,
          brand: false,
          barcode: false,
          status: true,
          salePrice: true,
          variantCount: true,
          stock: true,
        },
      },
    },
  };

  storageService.setLocalStorage(StorageKeyEnum.PREFERENCES, fakePreferences);

  useEffect(() => {
    // const token = storageService.getLocalStorage(StorageKeyEnum.TOKEN);
    // const url =
    //   "https://userservice.redground-5e8b9eee.germanywestcentral.azurecontainerapps.io/api/v1/preferences";
    // const fn = async () => {
    //   const res = await fetch(url, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //
    //   if (!res.ok) {
    //     if (res.status >= 300 && res.status < 400) {
    //       const response = await fetch(res.url, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    //
    //       console.log("FN RES: ", response);
    //     }
    //   }
    // };
    //
    // fn();

    service.getUserPreferencesHandler().then((res) => {
      console.log("RES", res);
    });
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
            />
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
