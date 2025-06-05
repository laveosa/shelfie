import { Plus } from "lucide-react";
import React from "react";

import cs from "./SelectSupplierCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { ISelectSupplierCard } from "@/const/interfaces/complex-components/custom-cards/ISelectSupplierCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { SupplierListGridColumns } from "@/components/complex/grid/supplier-list-grid/SupplierListGridColumns.tsx";

export default function SelectSupplierCard({
  suppliers,
  onAction,
}: ISelectSupplierCard) {
  const columns = SupplierListGridColumns(onAction);

  return (
    <SheProductCard
      className={cs.selectSupplierCad}
      title="Select Supplier"
      showCloseButton
      showPrimaryButton
      primaryButtonTitle="Select Supplier"
      onPrimaryButtonClick={() => onAction("selectSupplier")}
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
            onClick={() => onAction("openCreateSupplierCard")}
          />
        </div>
        <div className={cs.supplierListBlock}>
          <SheInput isSearch fullWidth placeholder="Search Supplier..." />
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
