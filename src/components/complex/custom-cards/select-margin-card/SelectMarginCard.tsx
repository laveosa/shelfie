import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import React from "react";

import cs from "./SelectMarginCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { MarginsListGridColumns } from "@/components/complex/grid/margins-list-grid/MarginsListGridColumns.tsx";
import { ISelectMarginCard } from "@/const/interfaces/complex-components/custom-cards/ISelectMarginCard.ts";

export default function SelectMarginCard({
  isLoading,
  isMarginListGridLoading,
  margins,
  onAction,
}: ISelectMarginCard) {
  function onGridAction(
    actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    switch (actionType) {
      case "manageMargin":
        onAction("manageMargin", row);
        break;
      case "selectMargin":
        onAction("selectMargin", row);
        break;
    }
  }

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.selectMarginCard}
      title="Select Margin"
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSelectMarginCard")}
    >
      <div className={cs.selectMarginCardContent}>
        <div className={cs.createMarginBlock}>
          <span className={`${cs.createMarginBlockText} she-text`}>
            Missing a Margin? Create one!
          </span>
          <SheButton
            icon={Plus}
            value="Create Margin"
            variant="outline"
            onClick={() => onAction("openCreateMarginCard")}
          />
        </div>
        <div className={cs.marginListBlock}>
          <SheInput
            isSearch
            fullWidth
            placeholder="Search Margin..."
            onDelay={(data: string) => onAction("searchMargin", data)}
          />
          <DndGridDataTable
            isLoading={isMarginListGridLoading}
            showHeader={false}
            columns={
              MarginsListGridColumns({
                onGridAction,
              }) as ColumnDef<DataWithId>[]
            }
            data={margins}
            customMessage="There are no margins created yet"
          />
        </div>
      </div>
    </SheProductCard>
  );
}
