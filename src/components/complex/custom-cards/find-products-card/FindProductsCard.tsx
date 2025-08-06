import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import {
  DataWithId,
  DndGridDataTable
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import SheProductCard
  from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./FindProductsCard.module.scss";
import {
  IFindProductsCard
} from "@/const/interfaces/complex-components/custom-cards/IFindProductsCard.ts";
import GridTraitsFilter
  from "@/components/complex/grid/grid-traits-filter/GridTraitsFilter.tsx";
import GridShowItemsFilter
  from "@/components/complex/grid/grid-show-deleted-filter/GridShowItemsFilter.tsx";
import {
  findProductGridColumns
} from "@/components/complex/grid/find-product-grid/FindProductGridColumns.tsx";

export default function FindProductsCard({
  isLoading,
  variants,
  preferences,
  gridModel,
  gridRequestModel,
  sortingOptions,
  colorsForFilter,
  sizesForFilter,
  onAction,
}: IFindProductsCard) {
  return (
    <SheProductCard
      loading={isLoading}
      title="Find Products"
      className={cs.findProductsCard}
    >
      <div className={cs.findProductsCardContent}>
        <DndGridDataTable
          isLoading={isLoading}
          columns={
            findProductGridColumns({
              onAction,
            }) as ColumnDef<DataWithId>[]
          }
          data={variants}
          gridModel={gridModel}
          sortingItems={sortingOptions}
          columnsPreferences={preferences}
          preferenceContext={"variantReferences"}
          skeletonQuantity={gridRequestModel.pageSize}
          onApplyColumns={() => onAction("onApplyColumns")}
          onDefaultColumns={() => onAction("onResetColumnsHandler")}
          onGridRequestChange={() => onAction("handleGridRequestChange")}
        >
          {/*<GridItemsFilter*/}
          {/*  items={state.brands}*/}
          {/*  columnName={"Brands"}*/}
          {/*  onSelectionChange={onBrandSelectHandler}*/}
          {/*  getId={(item: BrandModel) => item.brandId}*/}
          {/*  getName={(item: BrandModel) => item.brandName}*/}
          {/*  selected={state.variantsGridModel.filter?.brands}*/}
          {/*/>*/}
          {/*<GridItemsFilter*/}
          {/*  items={state.categories}*/}
          {/*  columnName={"Categories"}*/}
          {/*  onSelectionChange={onCategorySelectHandler}*/}
          {/*  getId={(item: CategoryModel) => item.categoryId}*/}
          {/*  getName={(item: CategoryModel) => item.categoryName}*/}
          {/*  selected={state.variantsGridModel.filter?.categories}*/}
          {/*/>*/}
          <GridTraitsFilter
            traitOptions={colorsForFilter}
            traitType="color"
            gridRequestModel={gridRequestModel}
          />
          <GridTraitsFilter
            traitOptions={sizesForFilter}
            traitType="size"
            gridRequestModel={gridRequestModel}
          />
          <GridShowItemsFilter context="Deleted" />
        </DndGridDataTable>
      </div>
    </SheProductCard>
  );
}
