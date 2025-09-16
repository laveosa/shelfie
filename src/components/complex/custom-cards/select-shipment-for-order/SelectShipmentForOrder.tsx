import { CalendarDays, Grid2x2Check, Truck, UserMinus, X } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useTranslation } from "react-i18next";

import { DndGridDataTable } from "@/components/complex/grid/SheGrid.tsx";
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
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { SelectShipmentForOrderGridColumns } from "@/components/complex/grid/custom-grids/select-shipment-for-order-grid/SelectShipmentForOrderGridColumns.tsx";
import { CalendarModeEnum } from "@/const/enums/CalendarModeEnum.ts";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export default function SelectShipmentForOrderCard({
  isLoading,
  isGridLoading,
  shipmentsGridModel,
  services,
  customer,
  onAction,
}: ISelectShipmentForOrderCard) {
  const { t } = useTranslation();

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
      title={t("CardTitles.SelectShipmentForOrder")}
      width="800px"
      className={cs.selectShipmentForOrderCard}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSelectShipmentForOrderCard")}
    >
      <div className={cs.selectShipmentForOrderCardContent}>
        <div className={cs.customerBlockContainer}>
          <span className="she-text">
            {t("ShipmentForm.Labels.ShowPendingShipments")}
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
                icon={UserMinus}
                value={
                  customer
                    ? t("SpecialText.ChangeCustomer")
                    : t("OrderActions.SelectCustomer")
                }
                variant="secondary"
                onClick={() => onAction("changeCustomer")}
              />
            </div>
            <SheButton
              icon={X}
              value={t("SpecialText.ShowAll")}
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
          customMessage={t("ShipmentMessages.NoShipmentsCreated")}
          sortingItems={sortingItems}
          onApplyColumns={(model) => onAction("applyColumns", model)}
          onDefaultColumns={() => onAction("resetColumns")}
          onGridRequestChange={(updates) =>
            onAction("gridRequestChange", updates)
          }
        >
          <SheSelect
            icon={Truck}
            placeholder={t("SelectOptions.Service")}
            minWidth="150px"
            items={services}
            onSelect={(value) =>
              onAction("gridRequestChange", { deliveryServiceId: value })
            }
          />
          <SheSelect
            icon={Grid2x2Check}
            placeholder={t("SelectOptions.Status")}
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
            placeholder={t("SelectOptions.Date")}
            minWidth="150px"
            mode={CalendarModeEnum.RANGE}
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
