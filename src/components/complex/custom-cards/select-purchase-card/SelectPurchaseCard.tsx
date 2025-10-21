import { CalendarRange } from "lucide-react";
import React from "react";

import cs from "./SelectPurchaseCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { SelectPurchaseGridColumns } from "@/components/complex/grid/custom-grids/select-purchase-grid/SelectPurchaseGridColumns.tsx";
import { CalendarModeEnum } from "@/const/enums/CalendarModeEnum.ts";
import { ISelectPurchaseCard } from "@/const/interfaces/complex-components/custom-cards/ISelectPurchaseCard.ts";

export default function SelectPurchaseCard({
  isLoading,
  isGridLoading,
  purchases,
  onAction,
}: ISelectPurchaseCard) {
  return (
    <SheProductCard
      loading={isLoading}
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
                    dateFrom: updates.from,
                    dateTo: updates.to,
                  }
                : {},
            );
          }}
          onClear={() => {
            onAction("filterSuppliersByDate", null);
          }}
        />
        <SheGrid
          isLoading={isGridLoading}
          showHeader={false}
          columns={SelectPurchaseGridColumns({
            onAction,
          })}
          data={purchases}
          skeletonQuantity={10}
        />
      </div>
    </SheProductCard>
  );
}
