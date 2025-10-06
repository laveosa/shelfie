import React from "react";

import { Plus, ShoppingCart } from "lucide-react";

import cs from "./OrdersCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import GridShowItemsFilter from "@/components/complex/grid/filters/grid-show-deleted-filter/GridShowItemsFilter.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { ordersGridColumns } from "@/components/complex/grid/custom-grids/orders-grid/OrdersGridColumns.tsx";
import { GridDateRangeFilter } from "@/components/complex/grid/filters/grid-date-range-filter/GridDateRangeFilter.tsx";
import { IOrdersCard } from "@/const/interfaces/complex-components/custom-cards/IOrdersCard.ts";

export default function OrdersCard({
  isLoading,
  isGridLoading,
  preferences,
  sortingOptions,
  ordersGridRequestModel,
  onAction,
}: IOrdersCard) {
  // ==================================================================== LAYOUT
  function onGridAction(
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    rowData?: any,
  ) {
    onAction("manageOrder", rowData);
  }

  // ==================================================================== LAYOUT
  return (
    <div className={cs.ordersCard}>
      <SheCard
        className={cs.ordersCardContent}
        headerClassName={cs.ordersCardHeader}
        title="Orders"
        titleTransKey="CardTitles.Orders"
        isLoading={isLoading}
      >
        <SheGrid
          isLoading={isGridLoading}
          columns={ordersGridColumns(onGridAction)}
          data={ordersGridRequestModel.items}
          gridRequestModel={ordersGridRequestModel}
          sortingItems={sortingOptions}
          columnsPreferences={preferences}
          preferenceContext={"productReferences"}
          skeletonQuantity={ordersGridRequestModel.pageSize}
          onApplyColumns={(model) => onAction("applyColumns", model)}
          onDefaultColumns={() => onAction("resetColumns")}
          onGridRequestChange={(updates) =>
            onAction("gridRequestChange", updates)
          }
        >
          <GridDateRangeFilter />
          <SheSelect
            icon={ShoppingCart}
            placeholder="Status"
            placeholderTransKey="OrderForm.Placeholders.Status"
            minWidth="150px"
          />
          <GridShowItemsFilter context="Canceled" />
        </SheGrid>
      </SheCard>
      <SheButton
        className={cs.createOrderButton}
        value="Create Order"
        valueTransKey="OrderActions.CreateOrder"
        icon={Plus}
        variant="info"
        onClick={() => onAction("createOrder")}
      />
    </div>
  );
}
