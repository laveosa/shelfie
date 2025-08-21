import { ColumnDef } from "@tanstack/react-table";
import { Plus, Truck } from "lucide-react";
import React from "react";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import cs from "./ShipmentDetailsCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IShipmentDetailsCard } from "@/const/interfaces/complex-components/custom-cards/IShipmentDetailsCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { ProductsInShipmentGridColumns } from "@/components/complex/grid/poducts-in-shipment-grid/ProductsInShipmentGridColumns.tsx";
import { OrderShipmentsGridColumns } from "@/components/complex/grid/order-shipments-grid/OrderShipmentsGridColumns.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export default function ShipmentDetailsCard({
  isLoading,
  isProductsGridLoading,
  isShipmentsGridLoading,
  products,
  shipments,
  customer,
  onAction,
}: IShipmentDetailsCard) {
  return (
    <SheProductCard
      loading={isLoading}
      title="Shipment details"
      minWidth="660px"
      className={cs.shipmentDetailsCard}
    >
      <div className={cs.shipmentDetailsCardContent}>
        <DndGridDataTable
          isLoading={isProductsGridLoading}
          showHeader={false}
          columns={ProductsInShipmentGridColumns as ColumnDef<DataWithId>[]}
          skeletonQuantity={5}
          data={products}
          customMessage="No item in shipment"
        />
        <Separator />
        <div className={cs.shipmentAllocationBlock}>
          <span className="she-title">Shipment allocation</span>
          <div className={cs.shipmentAllocationButtonBlock}>
            <SheButton
              icon={Plus}
              value="Create Shipment"
              onClick={() => onAction("createShipment")}
              disabled={!customer}
            />
            <span>or</span>
            <SheButton
              icon={Truck}
              value="Select Shipment"
              variant="secondary"
              onClick={() => onAction("selectShipment")}
            />
          </div>
        </div>
        <DndGridDataTable
          isLoading={isShipmentsGridLoading}
          showHeader={false}
          columns={
            OrderShipmentsGridColumns(onAction) as ColumnDef<DataWithId>[]
          }
          skeletonQuantity={5}
          data={shipments}
          customMessage="No item is scheduled for delivery"
        />
      </div>
    </SheProductCard>
  );
}
