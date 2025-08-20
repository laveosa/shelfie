import { Clock10, Package, PackageOpen, Plus, Truck } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ShipmentsCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheTabs from "@/components/complex/she-tabs/SheTabs.tsx";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import SheLoading from "@/components/primitive/she-loading/SheLoading.tsx";
import { IShipmentsCard } from "@/const/interfaces/complex-components/custom-cards/IShipmentsCard.ts";
import { SelectShipmentForOrderGridColumns } from "@/components/complex/grid/select-shipment-for-order-grid/SelectShipmentForOrderGridColumns.tsx";

export default function ShipmentsCard({
  isLoading,
  isShipmentsGridLoading,
  preferences,
  shipmentsGridModel,
  shipmentsGridRequestModel,
  onAction,
}: IShipmentsCard) {
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));

  return (
    <div
      className={`${cs.purchaseProductsCardWrapper} ${isLoading ? cs.cardContentLoading : ""}`}
    >
      {isLoading && <SheLoading className={cs.purchaseProductsCardLoader} />}
      <SheProductCard
        className={cs.purchaseProductsCard}
        title="Shipment"
        minWidth="1100px"
      >
        <div className={cs.purchaseProductsCardContent}>
          <SheTabs
            defaultValue="allShipments"
            onValueChange={() => onAction("setActiveTab")}
          >
            <div className={cs.tabItemsWrapper}>
              <TabsList className={cs.tabItems}>
                <div>
                  <TabsTrigger className={cs.tabItemTrigger} value="queued">
                    <div className={cs.tabBlock}>
                      <Clock10 size="16" /> Queued
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    className={cs.tabItemTrigger}
                    value="readyForPacking"
                  >
                    <div className={cs.tabBlock}>
                      <PackageOpen size="16" />
                      Ready for Packing
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    className={cs.tabItemTrigger}
                    value="readyForSending"
                  >
                    <div className={cs.tabBlock}>
                      <Package size="16" />
                      Ready for Sending
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    className={cs.tabItemTrigger}
                    value="allShipments"
                  >
                    <div className={cs.tabBlock}>
                      <Truck size="16" />
                      All Shipments
                    </div>
                  </TabsTrigger>
                </div>
                <SheButton
                  icon={Plus}
                  variant="default"
                  onClick={() => onAction("openCreateShipmentCard")}
                  value="Create Shipment"
                />
              </TabsList>
            </div>
            <TabsContent value="queued">
              <DndGridDataTable
                isLoading={isShipmentsGridLoading}
                columns={
                  SelectShipmentForOrderGridColumns(
                    onAction,
                  ) as ColumnDef<DataWithId>[]
                }
                data={shipmentsGridModel.items}
                gridModel={shipmentsGridModel}
                sortingItems={sortingItems}
                columnsPreferences={preferences}
                preferenceContext={"productReferences"}
                skeletonQuantity={shipmentsGridRequestModel.pageSize}
                onApplyColumns={() => onAction("applyColumns")}
                onDefaultColumns={() => onAction("resetColumnsHandler")}
                onGridRequestChange={() => onAction("gridRequestChange")}
              />
            </TabsContent>
            <TabsContent value="readyForPacking">
              <DndGridDataTable
                isLoading={isShipmentsGridLoading}
                columns={
                  SelectShipmentForOrderGridColumns(
                    onAction,
                  ) as ColumnDef<DataWithId>[]
                }
                data={shipmentsGridModel.items}
                gridModel={shipmentsGridModel}
                sortingItems={sortingItems}
                columnsPreferences={preferences}
                preferenceContext={"productReferences"}
                skeletonQuantity={shipmentsGridRequestModel.pageSize}
                onApplyColumns={() => onAction("applyColumns")}
                onDefaultColumns={() => onAction("resetColumnsHandler")}
                onGridRequestChange={() => onAction("gridRequestChange")}
              />
            </TabsContent>
            <TabsContent value="readyForSending">
              <DndGridDataTable
                isLoading={isShipmentsGridLoading}
                columns={
                  SelectShipmentForOrderGridColumns(
                    onAction,
                  ) as ColumnDef<DataWithId>[]
                }
                data={shipmentsGridModel.items}
                gridModel={shipmentsGridModel}
                sortingItems={sortingItems}
                columnsPreferences={preferences}
                preferenceContext={"productReferences"}
                skeletonQuantity={shipmentsGridRequestModel.pageSize}
                onApplyColumns={() => onAction("applyColumns")}
                onDefaultColumns={() => onAction("resetColumnsHandler")}
                onGridRequestChange={() => onAction("gridRequestChange")}
              />
            </TabsContent>
            <TabsContent value="allShipments">
              <DndGridDataTable
                isLoading={isShipmentsGridLoading}
                columns={
                  SelectShipmentForOrderGridColumns(
                    onAction,
                  ) as ColumnDef<DataWithId>[]
                }
                data={shipmentsGridModel.items}
                gridModel={shipmentsGridModel}
                sortingItems={sortingItems}
                columnsPreferences={preferences}
                preferenceContext={"productReferences"}
                skeletonQuantity={shipmentsGridRequestModel.pageSize}
                onApplyColumns={() => onAction("applyColumns")}
                onDefaultColumns={() => onAction("resetColumnsHandler")}
                onGridRequestChange={() => onAction("gridRequestChange")}
              />
            </TabsContent>
          </SheTabs>
        </div>
      </SheProductCard>
    </div>
  );
}
