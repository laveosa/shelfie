import React from "react";

import { Box, Plus } from "lucide-react";

import {
  CartStatusEnum,
  CartStatusLabels,
} from "@/const/enums/CartStatusEnum.ts";
import cs from "./OpenCartsCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { GridDateRangeFilter } from "@/components/complex/grid/filters/grid-date-range-filter/GridDateRangeFilter.tsx";
import { IOpenCartsCard } from "@/const/interfaces/complex-components/custom-cards/IOpenCartsCard.ts";
import { cartsGridColumns } from "@/components/complex/grid/custom-grids/carts-grid/CartsGridColumns.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import {
  CartPrepackedStatusEnum,
  CartPrepackedStatusLabels,
} from "@/const/enums/CartPrepackedStatusEnum.ts";

export default function OpenCartsCard({
  isLoading,
  isGridLoading,
  preferences,
  sortingOptions,
  openCartsGridRequestModel,
  onAction,
}: IOpenCartsCard) {
  // ==================================================================== LAYOUT
  const cartStatuses = Object.values(CartStatusEnum).map((status) => ({
    id: status,
    name: CartStatusLabels[status],
  }));

  function convertPrepackedStatusesToSelectItems(): ISheSelectItem<string>[] {
    return Object.values(CartPrepackedStatusEnum).map((status) => ({
      value: status,
      text: CartPrepackedStatusLabels[status],
    }));
  }

  return (
    <div className={cs.openCartsCard}>
      <SheCard
        className={cs.openCartsCardContent}
        headerClassName={cs.openCartsCardHeader}
        title="Open Carts"
        isLoading={isLoading}
        width="850px"
      >
        <SheGrid
          isLoading={isGridLoading}
          columns={cartsGridColumns(onAction)}
          data={openCartsGridRequestModel.items}
          gridRequestModel={openCartsGridRequestModel}
          sortingItems={sortingOptions}
          columnsPreferences={preferences}
          preferenceContext={"productReferences"}
          skeletonQuantity={openCartsGridRequestModel.pageSize}
          onApplyColumns={(model) => onAction("applyColumns", model)}
          onDefaultColumns={() => onAction("resetColumns")}
          onGridRequestChange={(updates) =>
            onAction("gridRequestChange", updates)
          }
        >
          <GridDateRangeFilter />
          <SheSelect
            items={convertPrepackedStatusesToSelectItems()}
            icon={Box}
            selected={
              openCartsGridRequestModel?.filter?.prepackedCartStatus ||
              undefined
            }
            placeholder="pick prepacked status... "
            hideFirstOption
            minWidth="180px"
            maxWidth="180px"
            onSelect={(value) => onAction("prepackedStatusFilterChange", value)}
          />
        </SheGrid>
      </SheCard>
      <SheButton
        className={cs.createCartButton}
        value="Create Cart"
        icon={Plus}
        variant="info"
        onClick={() => onAction("createCart")}
      />
    </div>
  );
}
