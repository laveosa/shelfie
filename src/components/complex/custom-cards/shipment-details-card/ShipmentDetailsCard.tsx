import React from "react";

import { Plus, Truck } from "lucide-react";

import cs from "./ShipmentDetailsCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { OrderShipmentsGridColumns } from "@/components/complex/grid/custom-grids/order-shipments-grid/OrderShipmentsGridColumns.tsx";
import { ProductsInShipmentGridColumns } from "@/components/complex/grid/custom-grids/poducts-in-shipment-grid/ProductsInShipmentGridColumns.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { IShipmentDetailsCard } from "@/const/interfaces/complex-components/custom-cards/IShipmentDetailsCard.ts";

export default function ShipmentDetailsCard({
  isLoading,
  isProductsGridLoading,
  isShipmentsGridLoading,
  products,
  shipments,
  customer,
  onAction,
}: IShipmentDetailsCard) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.shipmentDetailsCard}
      title="Shipment details"
      titleTransKey="CardTitles.ShipmentDetails"
      isLoading={isLoading}
    >
      <div className={cs.shipmentDetailsCardContent}>
        <SheGrid
          isLoading={isProductsGridLoading}
          showHeader={false}
          columns={ProductsInShipmentGridColumns}
          skeletonQuantity={5}
          data={products}
          customMessage="No items in order"
          customMessageTransKey="ShipmentMessages.NoItemsInShipment"
        />
        <Separator />
        <div className={cs.shipmentAllocationBlock}>
          <span className="she-title">
            {translate("ShipmentForm.Labels.ShipmentAllocation")}
          </span>
          <div className={cs.shipmentAllocationButtonBlock}>
            <SheButton
              value="Create Shipment"
              valueTransKey="OrderActions.CreateShipment"
              icon={Plus}
              variant="info"
              disabled={!customer}
              onClick={() => onAction("createShipment")}
            />
            <span>{translate("SpecialText.Or")}</span>
            <SheButton
              value="Select Shipment"
              valueTransKey="OrderActions.SelectShipment"
              icon={Truck}
              variant="default"
              onClick={() => onAction("selectShipment")}
            />
          </div>
        </div>
        <SheGrid
          isLoading={isShipmentsGridLoading}
          showHeader={false}
          columns={OrderShipmentsGridColumns(onAction)}
          skeletonQuantity={5}
          data={shipments}
          customMessage="No item is scheduled for delivery"
          customMessageTransKey="ShipmentMessages.NoItemsScheduledForDelivery"
        />
      </div>
    </SheCard>
  );
}
