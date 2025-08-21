import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./FindProductsCard.module.scss";
import { IFindProductsCard } from "@/const/interfaces/complex-components/custom-cards/IFindProductsCard.ts";
import GridTraitsFilter from "@/components/complex/grid/grid-traits-filter/GridTraitsFilter.tsx";
import { findProductGridColumns } from "@/components/complex/grid/find-product-grid/FindProductGridColumns.tsx";
import GridItemsFilter from "@/components/complex/grid/grid-items-filter/GridItemsFilter.tsx";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";

export default function FindProductsCard({
  isLoading,
  isGridLoading,
  variants,
  preferences,
  gridModel,
  gridRequestModel,
  sortingOptions,
  colorsForFilter,
  sizesForFilter,
  categories,
  brands,
  onAction,
}: IFindProductsCard) {
  return (
    <SheProductCard
      loading={isLoading}
      className={cs.findProductsCard}
      title="Find Products"
      width="1100px"
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeFindProductsCard")}
    >
      <div className={cs.findProductsCardContent}>
        <DndGridDataTable
          isLoading={isGridLoading}
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
          onGridRequestChange={(updates) =>
            onAction("variantsGridRequestChange", updates)
          }
        >
          <GridItemsFilter
            items={brands}
            columnName={"Brands"}
            getId={(item: BrandModel) => item.brandId}
            getName={(item: BrandModel) => item.brandName}
            selected={gridModel.filter?.brands}
            onSelectionChange={(updates) =>
              onAction("variantsGridRequestChange", {
                filter: { brands: updates },
              })
            }
          />
          <GridItemsFilter
            items={categories}
            columnName={"Categories"}
            getId={(item: CategoryModel) => item.categoryId}
            getName={(item: CategoryModel) => item.categoryName}
            selected={gridModel.filter?.categories}
            onSelectionChange={(updates) =>
              onAction("variantsGridRequestChange", {
                filter: { categoryId: updates },
              })
            }
          />
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
        </DndGridDataTable>
      </div>
    </SheProductCard>
  );
}
