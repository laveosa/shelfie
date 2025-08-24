import { ColumnDef } from "@tanstack/react-table";
import { CheckCheck } from "lucide-react";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { ISalePriceManagementCard } from "@/const/interfaces/complex-components/custom-cards/ISalePriceManagementCard.ts";
import cs from "@/components/complex/custom-cards/sale-price-management-card/SalePriceManagementCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { marginProductsGridColumns } from "@/components/complex/grid/margin-products-grid/MarginProductsGridColumns.tsx";
import GridItemsFilter from "@/components/complex/grid/grid-items-filter/GridItemsFilter.tsx";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import GridTraitsFilter from "@/components/complex/grid/grid-traits-filter/GridTraitsFilter.tsx";
import GridShowItemsFilter from "@/components/complex/grid/grid-show-deleted-filter/GridShowItemsFilter.tsx";

export default function SalePriseManagementCard({
  isLoading,
  isGridLoading,
  preferences,
  sortingOptions,
  brands,
  categories,
  colors,
  sizes,
  taxes,
  gridModel,
  gridRequestModel,
  onAction,
}: ISalePriceManagementCard) {
  return (
    <div className={cs.salePriceManagementCard}>
      <SheProductCard
        title="Sale Price Management"
        isLoading={isLoading}
        className={cs.salePriceManagementCardContent}
        minWidth="1100px"
      >
        <DndGridDataTable
          isLoading={isGridLoading}
          columns={
            marginProductsGridColumns(
              taxes,
              onAction,
            ) as ColumnDef<DataWithId>[]
          }
          data={gridModel.items}
          gridModel={gridModel}
          sortingItems={sortingOptions}
          columnsPreferences={preferences}
          preferenceContext={"productReferences"}
          skeletonQuantity={gridRequestModel.pageSize}
          onApplyColumns={(model) => onAction("applyColumns", model)}
          onDefaultColumns={() => onAction("resetColumns")}
          onGridRequestChange={(updates) =>
            onAction("gridRequestChange", updates)
          }
        >
          <GridItemsFilter
            items={brands}
            columnName={"Brands"}
            getId={(item: BrandModel) => item.brandId}
            getName={(item: BrandModel) => item.brandName}
            selected={gridModel.filter?.brands}
          />
          <GridItemsFilter
            items={categories}
            columnName={"Categories"}
            getId={(item: CategoryModel) => item.categoryId}
            getName={(item: CategoryModel) => item.categoryName}
            selected={gridModel.filter?.categories}
          />
          <GridTraitsFilter
            traitOptions={colors}
            traitType="color"
            gridRequestModel={gridRequestModel}
          />
          <GridTraitsFilter
            traitOptions={sizes}
            traitType="size"
            gridRequestModel={gridRequestModel}
          />
          <GridShowItemsFilter context="Deleted" />
        </DndGridDataTable>
      </SheProductCard>
      <div className={cs.buttonBlock}>
        <SheButton
          icon={CheckCheck}
          variant="default"
          onClick={() => onAction("applyVisibleMarginItems")}
          value="Apply visible prices"
          bgColor="#007AFF"
        />
        <SheButton
          icon={CheckCheck}
          variant="default"
          onClick={() => onAction("applyAllMarginItems")}
          value="Apply all prices"
          bgColor="#007AFF"
        />
      </div>
    </div>
  );
}
