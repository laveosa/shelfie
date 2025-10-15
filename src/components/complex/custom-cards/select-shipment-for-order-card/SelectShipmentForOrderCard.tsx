import React from "react";
import { CalendarDays, Grid2x2Check, Truck, UserMinus, X } from "lucide-react";

import {
  ShipmentStatusEnum,
  ShipmentStatusLabels,
} from "@/const/enums/ShipmentStatusEnum.ts";
import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";
import cs from "./SelectShipmentForOrderCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { SelectShipmentForOrderGridColumns } from "@/components/complex/grid/custom-grids/select-shipment-for-order-grid/SelectShipmentForOrderGridColumns.tsx";
import { getInitials } from "@/utils/helpers/quick-helper.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { CalendarModeEnum } from "@/const/enums/CalendarModeEnum.ts";
import { ISelectShipmentForOrderCard } from "@/const/interfaces/complex-components/custom-cards/ISelectShipmentForOrderCard.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { GridDateRangeFilter } from "@/components/complex/grid/filters/grid-date-range-filter/GridDateRangeFilter.tsx";

export default function SelectShipmentForOrderCard({
  isLoading,
  isGridLoading,
  shipmentsGridRequestModel,
  services,
  customer,
  onAction,
}: ISelectShipmentForOrderCard) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== PRIVATE
  function convertStatusesToSelectItems(): ISheSelectItem<string>[] {
    return Object.values(ShipmentStatusEnum).map((status) => ({
      value: status,
      text: ShipmentStatusLabels[status],
    }));
  }

  function convertToSortingItems(): GridSortingModel[] {
    return Object.values(GridSortingEnum).map((value) => ({
      value,
      description: GridSortingEnumLabels[value],
    }));
  }

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.selectShipmentForOrderCard}
      title="Select shipment for order"
      titleTransKey="CardTitles.SelectShipmentForOrder"
      showCloseButton
      isLoading={isLoading}
      onSecondaryButtonClick={() => onAction("closeSelectShipmentForOrderCard")}
    >
      <div className={cs.selectShipmentForOrderCardContent}>
        <div className={cs.customerBlockContainer}>
          <span className="she-text">
            {translate("ShipmentForm.Labels.ShowPendingShipments")}
          </span>
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
                value={customer ? "Change Customer" : "Select Customer"}
                valueTransKey={
                  customer
                    ? "SpecialText.ChangeCustomer"
                    : "OrderActions.SelectCustomer"
                }
                icon={UserMinus}
                variant="secondary"
                onClick={() => onAction("changeCustomer")}
              />
            </div>
            <SheButton
              value="Show All"
              valueTransKey="SpecialText.ShowAll"
              icon={X}
              variant="secondary"
              onClick={() => onAction("showAllShipments")}
            />
          </div>
        </div>
        <SheGrid
          gridRequestModel={shipmentsGridRequestModel}
          data={shipmentsGridRequestModel?.items}
          columns={SelectShipmentForOrderGridColumns(onAction)}
          sortingItems={convertToSortingItems()}
          skeletonQuantity={shipmentsGridRequestModel?.items?.length}
          customMessage="No shipments created yet"
          customMessageTransKey="ShipmentMessages.NoShipmentsCreated"
          isLoading={isGridLoading}
          onApplyColumns={(model) => onAction("applyColumns", model)}
          onDefaultColumns={() => onAction("resetColumns")}
          onGridRequestChange={(updates) =>
            onAction("gridRequestChange", updates)
          }
        >
          <SheSelect
            items={services}
            placeholder="Service"
            placeholderTransKey="SelectOptions.Service"
            icon={Truck}
            minWidth="150px"
            onSelect={(value) =>
              onAction("gridRequestChange", { deliveryServiceId: value })
            }
          />
          <SheSelect
            items={convertStatusesToSelectItems()}
            selected={
              shipmentsGridRequestModel.filter?.status as ShipmentStatusEnum
            }
            placeholder="Status"
            placeholderTransKey="SelectOptions.Status"
            icon={Grid2x2Check}
            minWidth="150px"
            hideFirstOption
            onSelect={(value: ShipmentStatusEnum) =>
              onAction("gridRequestChange", { shipmentStatus: value })
            }
          />
          <SheDatePicker
            placeholder="Date"
            placeholderTransKey="SelectOptions.Date"
            mode={CalendarModeEnum.RANGE}
            icon={CalendarDays}
            minWidth="150px"
            onSelectDate={(value) =>
              onAction("gridRequestChange", {
                startDate: value.from.toISOString(),
                endDate: value.to.toISOString(),
              })
            }
          />
          <GridDateRangeFilter />
        </SheGrid>
      </div>
    </SheCard>
  );
}
