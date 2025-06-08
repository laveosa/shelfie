import { Layers2, Plus, Shirt } from "lucide-react";
import { useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IPurchaseProductsCard } from "@/const/interfaces/complex-components/custom-cards/IPurchaseProductsCard.ts";
import cs from "./PurchaseProductsCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheTabs from "@/components/complex/she-tabs/SheTabs.tsx";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";

export default function PurchaseProductsCard({}: IPurchaseProductsCard) {
  const [activeTab, setActiveTab] = useState("purchaseProducts");
  return (
    <SheProductCard
      className={cs.purchaseProductsCard}
      showHeader={false}
      title={"Manage Purchases"}
      width="800px"
    >
      <div className={cs.productsPageContent}>
        <SheTabs defaultValue="products">
          <div className={cs.tabItemsWrapper}>
            <TabsList className={cs.tabItems}>
              <div>
                <TabsTrigger
                  className={cs.tabItemTrigger}
                  value="purchaseProducts"
                >
                  <div className={cs.tabBlock}>
                    <Shirt size="16" /> Purchase Products
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  className={cs.tabItemTrigger}
                  value="connectProducts"
                >
                  <div className={cs.tabBlock}>
                    <Layers2 size="16" />
                    Connect Products
                  </div>
                </TabsTrigger>
              </div>
              <SheButton
                icon={Plus}
                variant="ghost"
                // onClick={handleConfigure}
                value="Create Product"
              />
            </TabsList>
          </div>
          <TabsContent value="purchaseProducts">
            {/*<DndGridDataTable*/}
            {/*  isLoading={state.isLoading}*/}
            {/*  columns={productsColumns}*/}
            {/*  data={state.productsGridModel.items}*/}
            {/*  gridModel={state.productsGridModel}*/}
            {/*  sortingItems={state.sortingOptions}*/}
            {/*  columnsPreferences={appState.preferences}*/}
            {/*  preferenceContext={"productReferences"}*/}
            {/*  skeletonQuantity={state.productsGridRequestModel.pageSize}*/}
            {/*  onApplyColumns={onApplyColumnsHandler}*/}
            {/*  onDefaultColumns={onResetColumnsHandler}*/}
            {/*  onGridRequestChange={handleGridRequestChange}*/}
            {/*>*/}
            {/*  <GridItemsFilter*/}
            {/*    items={state.brands}*/}
            {/*    columnName={"Brands"}*/}
            {/*    onSelectionChange={onBrandSelectHandler}*/}
            {/*    getId={(item: BrandModel) => item.brandId}*/}
            {/*    getName={(item: BrandModel) => item.brandName}*/}
            {/*  />*/}
            {/*  <GridItemsFilter*/}
            {/*    items={state.categories}*/}
            {/*    columnName={"Categories"}*/}
            {/*    onSelectionChange={onCategorySelectHandler}*/}
            {/*    getId={(item: CategoryModel) => item.categoryId}*/}
            {/*    getName={(item: CategoryModel) => item.categoryName}*/}
            {/*  />*/}
            {/*</DndGridDataTable>*/}
          </TabsContent>
          <TabsContent value="connectProducts">
            {/*<DndGridDataTable*/}
            {/*  isLoading={state.isLoading}*/}
            {/*  columns={variantsColumns}*/}
            {/*  data={state.variantsGridModel.items}*/}
            {/*  gridModel={state.variantsGridModel}*/}
            {/*  sortingItems={state.sortingOptions}*/}
            {/*  columnsPreferences={appState.preferences}*/}
            {/*  preferenceContext={"variantReferences"}*/}
            {/*  skeletonQuantity={state.variantsGridRequestModel.pageSize}*/}
            {/*  onApplyColumns={onApplyColumnsHandler}*/}
            {/*  onDefaultColumns={onResetColumnsHandler}*/}
            {/*  onGridRequestChange={handleGridRequestChange}*/}
            {/*>*/}
            {/*  <GridItemsFilter*/}
            {/*    items={state.brands}*/}
            {/*    columnName={"Brands"}*/}
            {/*    onSelectionChange={onBrandSelectHandler}*/}
            {/*    getId={(item: BrandModel) => item.brandId}*/}
            {/*    getName={(item: BrandModel) => item.brandName}*/}
            {/*  />*/}
            {/*  <GridItemsFilter*/}
            {/*    items={state.categories}*/}
            {/*    columnName={"Categories"}*/}
            {/*    onSelectionChange={onCategorySelectHandler}*/}
            {/*    getId={(item: CategoryModel) => item.categoryId}*/}
            {/*    getName={(item: CategoryModel) => item.categoryName}*/}
            {/*  />*/}
            {/*</DndGridDataTable>*/}
          </TabsContent>
        </SheTabs>
      </div>
    </SheProductCard>
  );
}
