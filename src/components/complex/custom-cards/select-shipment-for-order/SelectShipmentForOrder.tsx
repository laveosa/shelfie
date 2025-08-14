import { CalendarDays, Grid2x2Check, Truck, UserMinus, X } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import cs from "./SelectShipmentForOrder.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { ISelectShipmentForOrderCard } from "@/const/interfaces/complex-components/custom-cards/ISelectShipmentForOrderCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { getInitials } from "@/utils/helpers/quick-helper.ts";
import { SelectShipmentForOrderGridColumns } from "@/components/complex/grid/select-shipment-for-order-grid/SelectShipmentForOrderGridColumns.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";

export default function SelectShipmentForOrderCard({
  isLoading,
  isGridLoading,
  shipmentsGridModel,
  services,
  statuses,
  customer,
  onAction,
}: ISelectShipmentForOrderCard) {
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
            onSelect={(value) => onAction("gridRequestChange", value)}
          />
          <SheSelect
            icon={Grid2x2Check}
            placeholder="Status"
            minWidth="150px"
            onSelect={(value) => onAction("gridRequestChange", value)}
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
