import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useTranslation } from "react-i18next";

import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./FindProductsCard.module.scss";
import { IFindProductsCard } from "@/const/interfaces/complex-components/custom-cards/IFindProductsCard.ts";
import GridTraitsFilter from "@/components/complex/grid/filters/grid-traits-filter/GridTraitsFilter.tsx";
import { findProductGridColumns } from "@/components/complex/grid/custom-grids/find-product-grid/FindProductGridColumns.tsx";
import GridItemsFilter from "@/components/complex/grid/filters/grid-items-filter/GridItemsFilter.tsx";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

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
  const { t } = useTranslation();

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.findProductsCard}
      title={t("CardTitles.FindProducts")}
      width="1100px"
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
          <GridItemsFilter
            items={brands}
            columnName={t("SectionTitles.Brand")}
            getId={(item: BrandModel) => item.brandId}
            getName={(item: BrandModel) => item.brandName}
            selected={gridRequestModel.filter?.brands}
          />
          <GridItemsFilter
            items={categories}
            columnName={t("SectionTitles.Category")}
            getId={(item: CategoryModel) => item.categoryId}
            getName={(item: CategoryModel) => item.categoryName}
            selected={gridRequestModel.filter?.categories}
          />
          <GridTraitsFilter traitOptions={colorsForFilter} traitType="color" />
          <GridTraitsFilter traitOptions={sizesForFilter} traitType="size" />
        </SheGrid>
      </div>
    </SheProductCard>
  );
}
