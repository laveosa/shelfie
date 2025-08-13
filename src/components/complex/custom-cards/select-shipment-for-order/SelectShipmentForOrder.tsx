import { ColumnDef } from "@tanstack/react-table";
import { UserMinus, X } from "lucide-react";
import React from "react";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import cs from "./SelectShipmentForOrder.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { ProductsInShipmentGridColumns } from "@/components/complex/grid/poducts-in-shipment-grid/ProductsInShipmentGridColumns.tsx";
import { ISelectShipmentForOrderCard } from "@/const/interfaces/complex-components/custom-cards/ISelectShipmentForOrderCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { getInitials } from "@/utils/helpers/quick-helper.ts";

export default function SelectShipmentForOrderCard({
  isLoading,
  isGridLoading,
  shipments,
  customer,
  onAction,
}: ISelectShipmentForOrderCard) {
  return (
    <SheProductCard
      loading={isLoading}
      title="Select shipment for order"
      width="500px"
      className={cs.selectShipmentForOrderCard}
      onSecondaryButtonClick={() => onAction("closeSelectShipmentForOrderCard")}
    >
      <div className={cs.selectShipmentForOrderCardContent}>
        <div className={cs.customerBlockContainer}>
          <span className="she-text">Show pending shipments of customer:</span>
          <div className={cs.customerBlock}>
            <div className={cs.customerInfo}>
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
              <SheButton
                icon={UserMinus}
                value="Change Customer"
                variant="secondary"
                onClick={() => onAction("changeCustomer")}
              />
            </div>
            <SheButton icon={X} value="Show All" variant="secondary" />
          </div>
        </div>
        <DndGridDataTable
          isLoading={isGridLoading}
          showHeader={false}
          columns={ProductsInShipmentGridColumns as ColumnDef<DataWithId>[]}
          skeletonQuantity={shipments?.length}
          data={shipments}
          customMessage="No shipments created yet"
        />
      </div>
    </SheProductCard>
  );
}
