import React from "react";

import cs from "./ReplaceVariantCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { IReplaceVariant } from "@/const/interfaces/complex-components/custom-cards/IReplaceVariant.ts";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { SelectVariantGridColumns } from "@/components/complex/grid/custom-grids/select-variant-grid/SelectVariantGridColumns.tsx";
import VariantInfoLayout from "@/components/layouts/variant-info-layout/VariantInfoLayout.tsx";

export default function ReplaceVariantCard({
  isLoading,
  isGridLoading,
  variant,
  variantsList,
  onAction,
}: IReplaceVariant) {
  return (
    <SheCard
      isLoading={isLoading}
      className={cs.replaceVariantCard}
      title="Replace Variant"
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeReplaceVariantCard")}
    >
      <div className={cs.replaceVariantCardContent}>
        <VariantInfoLayout isFullWidth variant={variant} />
        <div>
          <SheGrid
            isLoading={isGridLoading}
            showHeader={false}
            data={variantsList}
            columns={SelectVariantGridColumns(onAction)}
          />
        </div>
      </div>
    </SheCard>
  );
}
