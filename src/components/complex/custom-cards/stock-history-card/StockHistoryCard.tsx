import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./StockHistoryCard.module.scss";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { StockHistoryGridColumns } from "@/components/complex/grid/stock-history-grid/StockHistoryGridColumns.tsx";
import { IVariantHistoryCard } from "@/const/interfaces/complex-components/custom-cards/IVariantHistoryCard.ts";

export default function StockHistoryCard({
  variant,
  data,
  onSecondaryButtonClick,
  ...props
}: IVariantHistoryCard) {
  return (
    <SheProductCard
      title={`${variant?.variantName} Stock History`}
      view="card"
      showCloseButton
      width="350px"
      className={cs.stockHistoryCard}
      onSecondaryButtonClick={onSecondaryButtonClick}
      {...props}
    >
      <div className={cs.stockHistoryCardContent}>
        <div className={cs.stockHistoryGrid}>
          <DndGridDataTable
            enableDnd={true}
            showHeader={false}
            columns={StockHistoryGridColumns}
            data={variant?.photos}
            gridModel={data}
          />
        </div>
      </div>
    </SheProductCard>
  );
}
