import cs from "./ProductsPage.module.scss";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import {
  Columns3Icon,
  Download,
  Layers2,
  Plus,
  Receipt,
  Shirt,
} from "lucide-react";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SheTabs from "@/components/complex/she-tabs/SheTabs.tsx";

export function ProductsPage() {
  const service = useProductsPageService();

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
        <SheTabs defaultValue="Products">
          <div className={cs.tabItemsWrapper}>
            <TabsList className={cs.tabItems}>
              <TabsTrigger className={cs.tabItemTrigger} value="Products">
                <div className={cs.tabBlock}>
                  <Shirt size="16" /> Products
                </div>
              </TabsTrigger>
              <TabsTrigger className={cs.tabItemTrigger} value="Variants">
                <div className={cs.tabBlock}>
                  <Layers2 size="16" /> Variants
                </div>
              </TabsTrigger>
              <TabsTrigger className={cs.tabItemTrigger} value="Purchases">
                <div className={cs.tabBlock}>
                  <Receipt size="16" /> Purchases
                </div>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="Products">Products</TabsContent>
          <TabsContent value="Variants">Variants</TabsContent>
          <TabsContent value="Purchases">Purchases</TabsContent>
        </SheTabs>
      </div>
    </div>
  );
}
