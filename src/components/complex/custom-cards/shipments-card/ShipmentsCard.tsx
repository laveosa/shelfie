import React from "react";

import {
  BadgeCheck,
  Clock10,
  Package,
  PackageOpen,
  Plus,
  ShoppingCart,
  Truck,
} from "lucide-react";

import cs from "./ShipmentsCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheTabs from "@/components/complex/she-tabs/SheTabs.tsx";
import GridItemsFilter from "@/components/complex/grid/filters/grid-items-filter/GridItemsFilter.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { ShipmentsListGridColumns } from "@/components/complex/grid/custom-grids/shipments-list-grid/ShipmentsListGridColumns.tsx";
import { GridDateRangeFilter } from "@/components/complex/grid/filters/grid-date-range-filter/GridDateRangeFilter.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { IShipmentsCard } from "@/const/interfaces/complex-components/custom-cards/IShipmentsCard.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";

export default function ShipmentsCard({
  isLoading,
  isShipmentsGridLoading,
  preferences,
  sortingOptions,
  customersList,
  shipmentsGridRequestModel,
  onAction,
}: IShipmentsCard) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== LAYOUT
  return (
    <div className={cs.shipmentsCardWrapper}>
      <SheCard
        className={cs.shipmentsCard}
        title="Shipment"
        titleTransKey="SectionTitles.Shipment"
        isLoading={isLoading}
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
                      <Clock10 size="16" /> {translate("TabLabels.Queued")}
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    className={cs.tabItemTrigger}
                    value="readyForPacking"
                  >
                    <div className={cs.tabBlock}>
                      <PackageOpen size="16" />
                      {translate("TabLabels.ReadyForPacking")}
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    className={cs.tabItemTrigger}
                    value="readyForSending"
                  >
                    <div className={cs.tabBlock}>
                      <Package size="16" />
                      {translate("TabLabels.ReadyForSending")}
                    </div>
                  </TabsTrigger>
                  <TabsTrigger
                    className={cs.tabItemTrigger}
                    value="allShipments"
                  >
                    <div className={cs.tabBlock}>
                      <Truck size="16" />
                      {translate("TabLabels.AllShipments")}
                    </div>
                  </TabsTrigger>
                </div>
              </TabsList>
            </div>
            <TabsContent value="queued">
              <SheGrid
                isLoading={isShipmentsGridLoading}
                columns={ShipmentsListGridColumns(onAction)}
                data={shipmentsGridRequestModel.items}
                gridRequestModel={shipmentsGridRequestModel}
                sortingItems={sortingOptions}
                columnsPreferences={preferences}
                preferenceContext={"productReferences"}
                skeletonQuantity={shipmentsGridRequestModel.pageSize}
                onApplyColumns={() => onAction("applyColumns")}
                onDefaultColumns={() => onAction("resetColumnsHandler")}
                onGridRequestChange={(updates) =>
                  onAction("gridRequestChange", updates)
                }
              />
            </TabsContent>
            <TabsContent value="readyForPacking">
              <SheGrid
                isLoading={isShipmentsGridLoading}
                columns={ShipmentsListGridColumns(onAction)}
                data={shipmentsGridRequestModel.items}
                gridRequestModel={shipmentsGridRequestModel}
                sortingItems={sortingOptions}
                columnsPreferences={preferences}
                preferenceContext={"productReferences"}
                skeletonQuantity={shipmentsGridRequestModel.pageSize}
                onApplyColumns={() => onAction("applyColumns")}
                onDefaultColumns={() => onAction("resetColumnsHandler")}
                onGridRequestChange={(updates) =>
                  onAction("gridRequestChange", updates)
                }
              />
            </TabsContent>
            <TabsContent value="readyForSending">
              <SheGrid
                isLoading={isShipmentsGridLoading}
                columns={ShipmentsListGridColumns(onAction)}
                data={shipmentsGridRequestModel.items}
                gridRequestModel={shipmentsGridRequestModel}
                sortingItems={sortingOptions}
                columnsPreferences={preferences}
                preferenceContext={"productReferences"}
                skeletonQuantity={shipmentsGridRequestModel.pageSize}
                onApplyColumns={() => onAction("applyColumns")}
                onDefaultColumns={() => onAction("resetColumnsHandler")}
                onGridRequestChange={(updates) =>
                  onAction("gridRequestChange", updates)
                }
              />
            </TabsContent>
            <TabsContent value="allShipments">
              <SheGrid
                isLoading={isShipmentsGridLoading}
                columns={ShipmentsListGridColumns(onAction)}
                data={shipmentsGridRequestModel.items}
                gridRequestModel={shipmentsGridRequestModel}
                sortingItems={sortingOptions}
                columnsPreferences={preferences}
                preferenceContext={"productReferences"}
                skeletonQuantity={shipmentsGridRequestModel.pageSize}
                onApplyColumns={() => onAction("applyColumns")}
                onDefaultColumns={() => onAction("resetColumnsHandler")}
                onGridRequestChange={(updates) =>
                  onAction("gridRequestChange", updates)
                }
              >
                <GridItemsFilter
                  items={customersList as any}
                  columnName="Customer"
                  identifier="customerId"
                  icon={BadgeCheck}
                  getId={(item: CustomerModel) => item.customerId}
                  getName={(item: CustomerModel) => item.customerName}
                  selected={shipmentsGridRequestModel?.filter?.suppliers}
                />
                <GridDateRangeFilter />
                <SheSelect
                  placeholder="Status"
                  placeholderTransKey="OrderForm.Placeholders.Status"
                  icon={ShoppingCart}
                  minWidth="150px"
                />
                <SheSelect
                  placeholder="Status"
                  placeholderTransKey="OrderForm.Placeholders.Status"
                  icon={ShoppingCart}
                  minWidth="150px"
                />
              </SheGrid>
            </TabsContent>
          </SheTabs>
        </div>
      </SheCard>
      <SheButton
        className={cs.createShipmentButton}
        value="Create Shipment"
        valueTransKey="OrderActions.CreateShipment"
        icon={Plus}
        variant="info"
        onClick={() => onAction("createShipment")}
      />
    </div>
  );
}
