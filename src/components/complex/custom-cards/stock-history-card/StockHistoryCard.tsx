import React from "react";

import cs from "./StockHistoryCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { StockHistoryGridColumns } from "@/components/complex/grid/custom-grids/stock-history-grid/StockHistoryGridColumns.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { IVariantHistoryCard } from "@/const/interfaces/complex-components/custom-cards/IVariantHistoryCard.ts";

export default function StockHistoryCard({
  isLoading,
  isGridLoading,
  variant,
  data,
  onAction,
  ...props
}: IVariantHistoryCard) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.stockHistoryCard}
      title={translate("CardTitles.StockHistory", {
        variantName: variant?.variantName,
      })}
      showCloseButton
      showFooter
      isLoading={isLoading}
      showPrimaryButton={false}
      secondaryButtonTitle="CLOSE"
      onSecondaryButtonClick={() => onAction("closeVariantHistoryCard")}
      {...props}
    >
      <div className={cs.stockHistoryCardContent}>
        <div className={cs.stockHistoryGrid}>
          <SheGrid
            isLoading={isGridLoading}
            showHeader={false}
            columns={StockHistoryGridColumns}
            data={data}
          />
        </div>
      </div>
    </SheCard>
  );
}
