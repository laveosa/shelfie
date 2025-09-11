import { ColumnDef } from "@tanstack/react-table";
import { CheckCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { ISalePriceManagementCard } from "@/const/interfaces/complex-components/custom-cards/ISalePriceManagementCard.ts";
import cs from "@/components/complex/custom-cards/sale-price-management-card/SalePriceManagementCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import GridItemsFilter from "@/components/complex/grid/filters/grid-items-filter/GridItemsFilter.tsx";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import GridTraitsFilter from "@/components/complex/grid/filters/grid-traits-filter/GridTraitsFilter.tsx";
import GridShowItemsFilter from "@/components/complex/grid/filters/grid-show-deleted-filter/GridShowItemsFilter.tsx";
import { marginProductsGridColumns } from "@/components/complex/grid/custom-grids/margin-products-grid/MarginProductsGridColumns.tsx";

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
  gridRequestModel,
  onAction,
}: ISalePriceManagementCard) {
  const { t } = useTranslation();

  return (
    <div className={cs.salePriceManagementCard}>
      <SheProductCard
        title={t("CardTitles.SalePriceManagement")}
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
          data={gridRequestModel.items}
          sortingItems={sortingOptions}
          columnsPreferences={preferences}
          gridRequestModel={gridRequestModel}
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
          <GridTraitsFilter traitOptions={colors} traitType="color" />
          <GridTraitsFilter traitOptions={sizes} traitType="size" />
          <GridShowItemsFilter context="Deleted" />
        </DndGridDataTable>
      </SheProductCard>
      <div className={cs.buttonBlock}>
        <SheButton
          icon={CheckCheck}
          variant="default"
          onClick={() => onAction("applyVisibleMarginItems")}
          value={t("SpecialText.ApplyVisiblePrices")}
          bgColor="#007AFF"
        />
        <SheButton
          icon={CheckCheck}
          variant="default"
          onClick={() => onAction("applyAllMarginItems")}
          value={t("SpecialText.ApplyAllPrices")}
          bgColor="#007AFF"
        />
      </div>
    </div>
  );
}
