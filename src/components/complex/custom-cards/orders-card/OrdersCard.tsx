import { ColumnDef } from "@tanstack/react-table";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import GridShowDeletedFilter from "@/components/complex/grid/grid-show-deleted-filter/GridShowDeletedFilter.tsx";
import { IOrdersCard } from "@/const/interfaces/complex-components/custom-cards/IOrdersCard.ts";
import { ordersGridColumns } from "@/components/complex/grid/orders-grid/OrdersGridColumns.tsx";
import cs from "./OrdersCard.module.scss";

export default function OrdersCard({
  isLoading,
  isGridLoading,
  preferences,
  sortingOptions,
  ordersGridModel,
  ordersGridRequestModel,
  onAction,
}: IOrdersCard) {
  return (
    <div className={cs.salePriceManagementCard}>
      <SheProductCard
        title="Orders"
        isLoading={isLoading}
        className={cs.salePriceManagementCardContent}
        minWidth="1100px"
      >
        <DndGridDataTable
          isLoading={isGridLoading}
          columns={ordersGridColumns(onAction) as ColumnDef<DataWithId>[]}
          data={ordersGridModel.items}
          gridModel={ordersGridModel}
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
          <GridShowDeletedFilter />
        </DndGridDataTable>
      </SheProductCard>
    </div>
  );
}
