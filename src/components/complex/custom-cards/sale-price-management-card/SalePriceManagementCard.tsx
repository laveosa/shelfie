import { CheckCheck } from "lucide-react";

import cs from "@/components/complex/custom-cards/sale-price-management-card/SalePriceManagementCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import GridItemsFilter from "@/components/complex/grid/filters/grid-items-filter/GridItemsFilter.tsx";
import GridTraitsFilter from "@/components/complex/grid/filters/grid-traits-filter/GridTraitsFilter.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { marginProductsGridColumns } from "@/components/complex/grid/custom-grids/margin-products-grid/MarginProductsGridColumns.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ISalePriceManagementCard } from "@/const/interfaces/complex-components/custom-cards/ISalePriceManagementCard.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";

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
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== LAYOUT
  return (
    <div className={cs.salePriceManagementCard}>
      <SheCard
        className={cs.salePriceManagementCardContent}
        title="Sale Price Management"
        titleTransKey="CardTitles.SalePriceManagement"
        isLoading={isLoading}
      >
        <SheGrid
          isLoading={isGridLoading}
          columns={marginProductsGridColumns(taxes, onAction)}
          data={gridRequestModel?.items}
          sortingItems={sortingOptions}
          columnsPreferences={preferences}
          gridRequestModel={gridRequestModel}
          preferenceContext={"productReferences"}
          skeletonQuantity={gridRequestModel?.pageSize}
          onApplyColumns={(model) => onAction("applyColumns", model)}
          onDefaultColumns={() => onAction("resetColumns")}
          onGridRequestChange={(updates) =>
            onAction("gridRequestChange", updates)
          }
        >
          <GridItemsFilter
            items={brands as any}
            columnName={translate("SectionTitles.Brand")}
            getId={(item: BrandModel) => item.brandId}
            getName={(item: BrandModel) => item.brandName}
            selected={gridRequestModel?.filter?.brands}
          />
          <GridItemsFilter
            items={categories as any}
            columnName={translate("SectionTitles.Category")}
            getId={(item: CategoryModel) => item.categoryId}
            getName={(item: CategoryModel) => item.categoryName}
            selected={gridRequestModel?.filter?.categories}
          />
          <GridTraitsFilter traitOptions={colors} traitType="color" />
          <GridTraitsFilter traitOptions={sizes} traitType="size" />
        </SheGrid>
      </SheCard>
      <div className={cs.buttonBlock}>
        <SheButton
          value="Apply visible prices"
          valueTransKey="SpecialText.ApplyVisiblePrices"
          icon={CheckCheck}
          variant="info"
          onClick={() => onAction("applyVisibleMarginItems")}
        />
        <SheButton
          value="Apply all prices"
          valueTransKey="SpecialText.ApplyAllPrices"
          icon={CheckCheck}
          variant="info"
          onClick={() => onAction("applyAllMarginItems")}
        />
      </div>
    </div>
  );
}
