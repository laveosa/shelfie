import { Clock10, Package, PackageOpen, Plus, Truck } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import {
  GridSortingEnum,
  GridSortingEnumLabels,
} from "@/const/enums/GridSortingEnum.ts";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ShipmentsCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheTabs from "@/components/complex/she-tabs/SheTabs.tsx";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { IShipmentsCard } from "@/const/interfaces/complex-components/custom-cards/IShipmentsCard.ts";
import { ShipmentsListGridColumns } from "@/components/complex/grid/custom-grids/shipments-list-grid/ShipmentsListGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export default function ShipmentsCard({
  isLoading,
  isShipmentsGridLoading,
  preferences,
  shipmentsGridRequestModel,
  onAction,
}: IShipmentsCard) {
  const { t } = useTranslation();
  const sortingItems = Object.values(GridSortingEnum).map((value) => ({
    value,
    description: GridSortingEnumLabels[value],
  }));

  return (
    <div className={cs.shipmentsCardWrapper}>
      <SheProductCard
        loading={isLoading}
        className={cs.shipmentsCard}
        title={t("SectionTitles.Shipment")}
        minWidth="1100px"
      >
        <div className={cs.shipmentsCardContent}>
          <SheTabs
            defaultValue="allShipments"
            onValueChange={() => onAction("setActiveTab")}
          >
            <div className={cs.tabItemsWrapper}>
              <TabsList className={cs.tabItems}>
                <div>
                  <TabsTrigger className={cs.tabItemTrigger} value="queued">
                    <div className={cs.tabBlock}>
                      <Clock10 size="16" /> {t("TabLabels.Queued")}
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    className={cs.tabItemTrigger}
                    value="readyForPacking"
                  >
                    <div className={cs.tabBlock}>
                      <PackageOpen size="16" />
                      {t("TabLabels.ReadyForPacking")}
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    className={cs.tabItemTrigger}
                    value="readyForSending"
                  >
                    <div className={cs.tabBlock}>
                      <Package size="16" />
                      {t("TabLabels.ReadyForSending")}
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    className={cs.tabItemTrigger}
                    value="allShipments"
                  >
                    <div className={cs.tabBlock}>
                      <Truck size="16" />
                      {t("TabLabels.AllShipments")}
                    </div>
                  </TabsTrigger>
                </div>
              </TabsList>
            </div>
            <TabsContent value="queued">
              <SheGrid
                isLoading={isShipmentsGridLoading}
                columns={
                  ShipmentsListGridColumns(onAction) as ColumnDef<DataWithId>[]
                }
                data={shipmentsGridRequestModel.items}
                gridRequestModel={shipmentsGridRequestModel}
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
              <SheGrid
                isLoading={isShipmentsGridLoading}
                columns={
                  ShipmentsListGridColumns(onAction) as ColumnDef<DataWithId>[]
                }
                data={shipmentsGridRequestModel.items}
                gridRequestModel={shipmentsGridRequestModel}
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
              <SheGrid
                isLoading={isShipmentsGridLoading}
                columns={
                  ShipmentsListGridColumns(onAction) as ColumnDef<DataWithId>[]
                }
                data={shipmentsGridRequestModel.items}
                gridRequestModel={shipmentsGridRequestModel}
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
              <SheGrid
                isLoading={isShipmentsGridLoading}
                columns={
                  ShipmentsListGridColumns(onAction) as ColumnDef<DataWithId>[]
                }
                data={shipmentsGridRequestModel.items}
                gridRequestModel={shipmentsGridRequestModel}
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
      <SheButton
        className={cs.createShipmentButton}
        icon={Plus}
        variant="default"
        onClick={() => onAction("createShipment")}
        value={t("OrderActions.CreateShipment")}
        bgColor="#007AFF"
      />
    </div>
  );
}
