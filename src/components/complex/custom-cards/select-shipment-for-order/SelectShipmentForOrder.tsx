import { CalendarDays, Grid2x2Check, Truck, UserMinus, X } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import {
  ShipmentStatusEnum,
  ShipmentStatusLabels,
} from "@/const/enums/ShipmentStatusEnum.ts";
import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";
import cs from "./SelectShipmentForOrder.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { ISelectShipmentForOrderCard } from "@/const/interfaces/complex-components/custom-cards/ISelectShipmentForOrderCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { getInitials } from "@/utils/helpers/quick-helper.ts";
import { SelectShipmentForOrderGridColumns } from "@/components/complex/grid/select-shipment-for-order-grid/SelectShipmentForOrderGridColumns.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export default function SelectShipmentForOrderCard({
  isLoading,
  isGridLoading,
  shipmentsGridModel,
  services,
  customer,
  onAction,
}: ISelectShipmentForOrderCard) {
  function convertStatusesToSelectItems(): ISheSelectItem<ShipmentStatusEnum>[] {
    return Object.values(ShipmentStatusEnum).map((status) => ({
      value: status,
      text: ShipmentStatusLabels[status],
    }));
  }

  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));

  return (
    <SheProductCard
      loading={isLoading}
      title="Select shipment for order"
      width="800px"
      className={cs.selectShipmentForOrderCard}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSelectShipmentForOrderCard")}
    >
      <div className={cs.selectShipmentForOrderCardContent}>
        <div className={cs.customerBlockContainer}>
          <span className="she-text">Show pending shipments of customer:</span>
          <div className={cs.customerBlock}>
            <div className={cs.customerInfo}>
              {customer && (
                <div className={cs.customerInfoAvatarBlock}>
                  {customer?.thumbnailUrl ? (
                    <img
                      src={customer?.thumbnailUrl}
                      alt={customer?.name || customer?.customerName}
                      className={cs.avatarImage}
                    />
                  ) : (
                    <div className={cs.avatarInitials}>
                      {getInitials(customer?.name || customer?.customerName)}
                    </div>
                  )}
                  <span className={`${cs.customerName} she-subtext`}>
                    {customer?.name || customer?.customerName}
                  </span>
                </div>
              )}
              <SheButton
                icon={UserMinus}
                value={customer ? "Change Customer" : "Select Customer"}
                variant="secondary"
                onClick={() => onAction("changeCustomer")}
              />
            </div>
            <SheButton
              icon={X}
              value="Show All"
              variant="secondary"
              onClick={() => onAction("showAllShipments")}
            />
          </div>
        </div>
        <DndGridDataTable
          isLoading={isGridLoading}
          columns={
            SelectShipmentForOrderGridColumns(
              onAction,
            ) as ColumnDef<DataWithId>[]
          }
          gridModel={shipmentsGridModel}
          skeletonQuantity={shipmentsGridModel?.items.length}
          data={shipmentsGridModel?.items}
          customMessage="No shipments created yet"
          sortingItems={sortingItems}
          onApplyColumns={(model) => onAction("applyColumns", model)}
          onDefaultColumns={() => onAction("resetColumns")}
          onGridRequestChange={(updates) =>
            onAction("gridRequestChange", updates)
          }
        >
          <SheSelect
            icon={Truck}
            placeholder="Service"
            minWidth="150px"
            items={services}
            onSelect={(value) =>
              onAction("gridRequestChange", { deliveryServiceId: value })
            }
          />
          <SheSelect
            icon={Grid2x2Check}
            placeholder="Status"
            minWidth="150px"
            items={convertStatusesToSelectItems()}
            onSelect={(value: ShipmentStatusEnum) =>
              onAction("gridRequestChange", { shipmentStatus: value })
            }
            hideFirstOption
            selected={shipmentsGridModel.filter?.status as ShipmentStatusEnum}
          />
          <SheDatePicker
            icon={CalendarDays}
            placeholder="Date"
            minWidth="150px"
            mode="range"
            onSelectDate={(value) =>
              onAction("gridRequestChange", {
                startDate: value.from.toISOString(),
                endDate: value.to.toISOString(),
              })
            }
          />
        </DndGridDataTable>
      </div>
    </SheProductCard>
  );
}
