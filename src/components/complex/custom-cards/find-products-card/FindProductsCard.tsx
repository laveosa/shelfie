import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import cs from "./FindProductsCard.module.scss";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import GridTraitsFilter from "@/components/complex/grid/filters/grid-traits-filter/GridTraitsFilter.tsx";
import { findProductGridColumns } from "@/components/complex/grid/custom-grids/find-product-grid/FindProductGridColumns.tsx";
import GridItemsFilter from "@/components/complex/grid/filters/grid-items-filter/GridItemsFilter.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";
import { IFindProductsCard } from "@/const/interfaces/complex-components/custom-cards/IFindProductsCard.ts";

export default function FindProductsCard({
  isLoading,
  isGridLoading,
  variants,
  preferences,
  gridRequestModel,
  sortingOptions,
  colorsForFilter,
  sizesForFilter,
  categories,
  brands,
  onAction,
}: IFindProductsCard) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.findProductsCard}
      title={translate("CardTitles.FindProducts")}
      width="100%"
      isLoading={isLoading}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeFindProductsCard")}
    >
      <div className={cs.findProductsCardContent}>
        <SheGrid
          isLoading={isGridLoading}
          columns={
            findProductGridColumns({
              onAction,
            }) as ColumnDef<DataWithId>[]
          }
          data={variants}
          gridRequestModel={gridRequestModel}
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
          <GridItemsFilter<BrandModel>
            items={brands}
            columnName={translate("SectionTitles.Brand")}
            getId={(item: BrandModel) => item.brandId}
            getName={(item: BrandModel) => item.brandName}
            selected={gridRequestModel.filter?.brands}
          />
          <GridItemsFilter<CategoryModel>
            items={categories}
            columnName={translate("SectionTitles.Category")}
            getId={(item: CategoryModel) => item.categoryId}
            getName={(item: CategoryModel) => item.categoryName}
            selected={gridRequestModel.filter?.categories}
          />
          <GridTraitsFilter traitOptions={colorsForFilter} traitType="color" />
          <GridTraitsFilter traitOptions={sizesForFilter} traitType="size" />
        </SheGrid>
      </div>
    </SheCard>
  );
}
