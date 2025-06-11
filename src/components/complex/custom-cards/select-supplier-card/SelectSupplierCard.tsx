import { Plus } from "lucide-react";
import React, { useState } from "react";

import cs from "./SelectSupplierCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { ISelectSupplierCard } from "@/const/interfaces/complex-components/custom-cards/ISelectSupplierCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { SuppliersListGridColumns } from "@/components/complex/grid/supplier-list-grid/SuppliersListGridColumns.tsx";

export default function SelectSupplierCard({
  isLoading,
  suppliers,
  onAction,
}: ISelectSupplierCard) {
  const [selectedSupplier, setSelectedSupplier] = useState<any | null>(null);

  const columns = SuppliersListGridColumns({
    onGridAction,
    selectedSupplier,
    setSelectedSupplier,
  });

  function onGridAction(
    actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    switch (actionType) {
      case "manageSupplier":
        handleAction("manageSupplier", row.original);
        break;
    }
  }

  function handleAction(actionType: any, payload?: any) {
    switch (actionType) {
      case "manageSupplier":
        onAction("manageSupplier", payload);
        break;
    }
  }

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.selectSupplierCad}
      title="Select Supplier"
      showCloseButton
      showPrimaryButton
      primaryButtonTitle="Select Supplier"
      onPrimaryButtonClick={() => {
        if (selectedSupplier) {
          onAction("selectSupplier", selectedSupplier);
        }
      }}
      showSecondaryButton
      onSecondaryButtonClick={() => onAction("closeSelectSupplierCard")}
    >
      <div className={cs.selectSupplierCardContent}>
        <div className={cs.createSupplierBlock}>
          <span className="she-text">Missing a Supplier? Create one!</span>
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
            columns={columns}
            data={suppliers}
            customMessage="There are no suppliers created yet"
            // gridModel={suppliers}
          />
        </div>
      </div>
    </SheProductCard>
  );
}
