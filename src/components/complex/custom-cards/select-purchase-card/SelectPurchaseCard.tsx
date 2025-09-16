import { CalendarRange } from "lucide-react";
import React from "react";

import cs from "./SelectPurchaseCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { DndGridDataTable } from "@/components/complex/grid/SheGrid.tsx";
import { ISelectPurchaseCard } from "@/const/interfaces/complex-components/custom-cards/ISelectPurchaseCard.ts";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import { CalendarModeEnum } from "@/const/enums/CalendarModeEnum.ts";

export default function SelectPurchaseCard({
  isLoading,
  isGridLoading,
  purchases,
  columns,
  onAction,
}: ISelectPurchaseCard) {
  return (
    <SheProductCard
      loading={isLoading}
      className={cs.selectPurchaseCard}
      title="Select Purchase"
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSelectPurchaseCard")}
    >
      <div className={cs.selectPurchaseCardContent}>
        <SheInput
          isSearch
          fullWidth
          showClearBtn
          placeholder="Search supplier..."
          onDelay={(data: string) => onAction("searchSupplier", data)}
          onClear={() => onAction("searchSupplier", null)}
        />
        <SheDatePicker
          mode={CalendarModeEnum.RANGE}
          icon={CalendarRange}
          fullWidth
          showClearBtn
          placeholder="Pick purchase date range"
          onSelectDate={(updates) => {
            onAction(
              "filterSuppliersByDate",
              updates
                ? {
                    startDate: updates.from,
                    endDate: updates.to,
                  }
                : {},
            );
          }}
          onClear={() => {
            onAction("filterSuppliersByDate", null);
          }}
        />
        <DndGridDataTable
          isLoading={isGridLoading}
          showHeader={false}
          columns={columns}
          data={purchases}
          skeletonQuantity={10}
        />
      </div>
    </SheProductCard>
  );
}
