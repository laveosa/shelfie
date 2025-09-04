import { ColumnDef } from "@tanstack/react-table";
import { Plus, Truck } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import cs from "./ShipmentDetailsCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IShipmentDetailsCard } from "@/const/interfaces/complex-components/custom-cards/IShipmentDetailsCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

import { Separator } from "@/components/ui/separator.tsx";
import { ProductsInShipmentGridColumns } from "@/components/complex/grid/custom-grids/poducts-in-shipment-grid/ProductsInShipmentGridColumns.tsx";
import { OrderShipmentsGridColumns } from "@/components/complex/grid/custom-grids/order-shipments-grid/OrderShipmentsGridColumns.tsx";

export default function ShipmentDetailsCard({
  isLoading,
  isProductsGridLoading,
  isShipmentsGridLoading,
  products,
  shipments,
  customer,
  onAction,
}: IShipmentDetailsCard) {
  const { t } = useTranslation();

  return (
    <SheProductCard
      loading={isLoading}
      title={t("CardTitles.ShipmentDetails")}
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
          customMessage={t("ShipmentMessages.NoItemsInShipment")}
        />
        <Separator />
        <div className={cs.shipmentAllocationBlock}>
          <span className="she-title">
            {t("ShipmentForm.Labels.ShipmentAllocation")}
          </span>
          <div className={cs.shipmentAllocationButtonBlock}>
            <SheButton
              icon={Plus}
              value={t("OrderActions.CreateShipment")}
              onClick={() => onAction("createShipment")}
              disabled={!customer}
            />
            <span>{t("SpecialText.Or")}</span>
            <SheButton
              icon={Truck}
              value={t("OrderActions.SelectShipment")}
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
          customMessage={t("ShipmentMessages.NoItemsScheduledForDelivery")}
        />
      </div>
    </SheProductCard>
  );
}
