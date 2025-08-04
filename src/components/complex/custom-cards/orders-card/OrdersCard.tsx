import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import GridShowDeletedFilter from "@/components/complex/grid/grid-show-deleted-filter/GridShowDeletedFilter.tsx";
import { IOrdersCard } from "@/const/interfaces/complex-components/custom-cards/IOrdersCard.ts";
import { ordersGridColumns } from "@/components/complex/grid/orders-grid/OrdersGridColumns.tsx";
import cs from "./OrdersCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";

export default function OrdersCard({
  isLoading,
  isGridLoading,
  preferences,
  sortingOptions,
  ordersGridModel,
  ordersGridRequestModel,
  onAction,
}: IOrdersCard) {
  function onGridAction(
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    rowData?: any,
  ) {
    onAction("manageOrder", rowData);
  }

  return (
    <div className={cs.ordersCard}>
      <SheProductCard
        title="Orders"
        isLoading={isLoading}
        className={cs.ordersCardContent}
        minWidth="1100px"
      >
        <DndGridDataTable
          isLoading={isGridLoading}
          columns={ordersGridColumns(onGridAction) as ColumnDef<DataWithId>[]}
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
          <SheDatePicker mode="range" />
          <GridShowDeletedFilter />
        </DndGridDataTable>
      </SheProductCard>
      <SheButton
        className={cs.createOrderButton}
        icon={Plus}
        variant="default"
        onClick={() => onAction("createOrder")}
        value="Create Order"
        bgColor="#007AFF"
      />
    </div>
  );
}
