import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import React from "react";

import cs from "./SelectSupplierCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { ISelectSupplierCard } from "@/const/interfaces/complex-components/custom-cards/ISelectSupplierCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { SuppliersListGridColumns } from "@/components/complex/grid/supplier-list-grid/SuppliersListGridColumns.tsx";

export default function SelectSupplierCard({
  isLoading,
  suppliers,
  onAction,
}: ISelectSupplierCard) {
  function onGridAction(
    actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    switch (actionType) {
      case "manageSupplier":
        onAction("manageSupplier", row);
        break;
      case "selectSupplier":
        onAction("selectSupplier", row);
        break;
    }
  }

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.selectSupplierCad}
      title="Select Supplier"
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSelectSupplierCard")}
    >
      <div className={cs.selectSupplierCardContent}>
        <div className={cs.createSupplierBlock}>
          <span className={`${cs.createSupplierBlockText} she-text`}>
            Missing a Supplier? Create one!
          </span>
          <SheButton
            icon={Plus}
            value="Create Supllier"
            variant="outline"
            onClick={() => onAction("openSupplierConfigurationCard")}
          />
        </div>
        <div className={cs.supplierListBlock}>
          <SheInput
            isSearch
            fullWidth
            placeholder="Search Supplier..."
            onDelay={(data: string) => onAction("searchSupplier", data)}
          />
          <DndGridDataTable
            showHeader={false}
            columns={
              SuppliersListGridColumns({
                onGridAction,
              }) as ColumnDef<DataWithId>[]
            }
            data={suppliers}
            customMessage="There are no suppliers created yet"
          />
        </div>
      </div>
    </SheProductCard>
  );
}
