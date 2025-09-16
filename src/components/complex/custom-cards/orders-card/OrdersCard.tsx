import { ColumnDef } from "@tanstack/react-table";
import { CalendarRange, Plus, ShoppingCart } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import { DndGridDataTable } from "@/components/complex/grid/SheGrid.tsx";
import cs from "./OrdersCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import GridShowItemsFilter from "@/components/complex/grid/filters/grid-show-deleted-filter/GridShowItemsFilter.tsx";
import { IOrdersCard } from "@/const/interfaces/complex-components/custom-cards/IOrdersCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ordersGridColumns } from "@/components/complex/grid/custom-grids/orders-grid/OrdersGridColumns.tsx";
import { CalendarModeEnum } from "@/const/enums/CalendarModeEnum.ts";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export default function OrdersCard({
  isLoading,
  isGridLoading,
  preferences,
  sortingOptions,
  ordersGridRequestModel,
  onAction,
}: IOrdersCard) {
  const { t } = useTranslation();

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
        title={t("CardTitles.Orders")}
        isLoading={isLoading}
        className={cs.ordersCardContent}
        minWidth="1100px"
      >
        <DndGridDataTable
          isLoading={isGridLoading}
          columns={ordersGridColumns(onGridAction) as ColumnDef<DataWithId>[]}
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
          <SheDatePicker
            icon={CalendarRange}
            mode={CalendarModeEnum.RANGE}
            minWidth="150px"
            placeholder={t("OrderForm.Placeholders.PickRange")}
            onSelectDate={(updates) => {
              onAction("gridRequestChange", {
                filter: {
                  startDate: updates.from,
                  endDate: updates.to,
                },
              });
            }}
          />
          <SheSelect
            icon={ShoppingCart}
            placeholder={t("OrderForm.Placeholders.Status")}
            minWidth="150px"
          />
          <GridShowItemsFilter context="Canceled" />
        </DndGridDataTable>
      </SheProductCard>
      <SheButton
        className={cs.createOrderButton}
        icon={Plus}
        variant="default"
        onClick={() => onAction("createOrder")}
        value={t("OrderActions.CreateOrder")}
        bgColor="#007AFF"
      />
    </div>
  );
}
