import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import useProductsPageService from "@/pages/products-section/products-page/useProductsPageService.ts";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/redux.ts";
import { IAppSlice } from "@/const/interfaces/store-slices/IAppSlice.ts";
import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { IPurchaseProductsPageSlice } from "@/const/interfaces/store-slices/IPurchaseProductsPageSlice.ts";
import { ISalePriceManagementCard } from "@/const/interfaces/complex-components/custom-cards/ISalePriceManagementCard.ts";
import cs from "@/components/complex/custom-cards/sale-price-management-card/SalePriceManagementCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { CheckCheck } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { marginProductsGridColumns } from "@/components/complex/grid/margin-products-grid/MarginProductsGridColumns.tsx";

export default function SalePriseManagementCard({
  isLoading,
  isGridLoading,
  preferences,
  taxes,
  gridModel,
  gridRequestModel,
  onAction,
}: ISalePriceManagementCard) {
  const productsService = useProductsPageService();
  const dispatch = useAppDispatch();
  const appState = useAppSelector<IAppSlice>(StoreSliceEnum.APP);
  const state = useAppSelector<IPurchaseProductsPageSlice>(
    StoreSliceEnum.PURCHASE_PRODUCTS,
  );
  return (
    <SheProductCard
      isLoading={isLoading}
      className={cs.salePriceManagementCard}
      showHeader={false}
      title={"Sale Price Management"}
      minWidth="1150px"
    >
      <div className={cs.buttonBlock}>
        <SheButton
          icon={CheckCheck}
          variant="default"
          onClick={() => onAction("openCreateProductCard")}
          value="Apply visible prices"
        />
        <SheButton
          icon={CheckCheck}
          variant="default"
          onClick={() => onAction("openCreateProductCard")}
          value="Apply all prices"
        />
      </div>
      <DndGridDataTable
        isLoading={isGridLoading}
        columns={
          marginProductsGridColumns(taxes, onAction) as ColumnDef<DataWithId>[]
        }
        data={gridModel.items}
        gridModel={gridModel}
        // sortingItems={sortingOptions}
        columnsPreferences={preferences}
        preferenceContext={"productReferences"}
        skeletonQuantity={gridRequestModel.pageSize}
        // onApplyColumns={onApplyColumnsHandler}
        // onDefaultColumns={onResetColumnsHandler}
        // onGridRequestChange={handleGridRequestChange}
      />
    </SheProductCard>
  );
}
