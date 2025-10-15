import React from "react";
import { UserMinus, X } from "lucide-react";

import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";
import cs from "./SelectOrderForShipmentCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { getInitials } from "@/utils/helpers/quick-helper.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { GridDateRangeFilter } from "@/components/complex/grid/filters/grid-date-range-filter/GridDateRangeFilter.tsx";
import { ISelectOrderForShipmentCard } from "@/const/interfaces/complex-components/custom-cards/ISelectOrderForShipmentCard.ts";
import { SelectOrderForShipmentGridColumns } from "@/components/complex/grid/custom-grids/select-order-for-shipment-gris/SelectOrderForShipmentGrisColumn.tsx";

export default function SelectOrderForShipmentCard({
  isLoading,
  isGridLoading,
  ordersGridRequestModel,
  customer,
  onAction,
}: ISelectOrderForShipmentCard) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== PRIVATE

  function convertToSortingItems(): GridSortingModel[] {
    return Object.values(GridSortingEnum).map((value) => ({
      value,
      description: GridSortingEnumLabels[value],
    }));
  }

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.selectOrderForShipmentCard}
      title="Select order for shipment"
      titleTransKey=""
      showCloseButton
      isLoading={isLoading}
      onSecondaryButtonClick={() => onAction("closeSelectOrderForShipmentCard")}
    >
      <div className={cs.selectOrderForShipmentCardContent}>
        <div className={cs.customerBlockContainer}>
          <span className="she-text">Show customer orders:</span>
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
              onClick={() => onAction("showAllOrders")}
            />
          </div>
        </div>
        <SheGrid
          gridRequestModel={ordersGridRequestModel}
          data={ordersGridRequestModel?.items}
          columns={SelectOrderForShipmentGridColumns(onAction)}
          sortingItems={convertToSortingItems()}
          skeletonQuantity={ordersGridRequestModel?.items?.length}
          customMessage="No orders created yet"
          customMessageTransKey=""
          isLoading={isGridLoading}
          onApplyColumns={(model) => onAction("applyColumns", model)}
          onDefaultColumns={() => onAction("resetColumns")}
          onGridRequestChange={(updates) =>
            onAction("gridRequestChange", updates)
          }
        >
          <GridDateRangeFilter />
        </SheGrid>
      </div>
    </SheCard>
  );
}
