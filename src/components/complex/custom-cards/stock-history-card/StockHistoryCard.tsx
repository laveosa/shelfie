import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./StockHistoryCard.module.scss";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { StockHistoryGridColumns } from "@/components/complex/grid/stock-history-grid/StockHistoryGridColumns.tsx";
import { IVariantHistoryCard } from "@/const/interfaces/complex-components/custom-cards/IVariantHistoryCard.ts";

export default function StockHistoryCard({
  isLoading,
  isGridLoading,
  variant,
  data,
  onSecondaryButtonClick,
  ...props
}: IVariantHistoryCard) {
  return (
    <SheProductCard
      loading={isLoading}
      title={`${variant?.variantName} Stock History`}
      showCloseButton
      className={cs.stockHistoryCard}
      onSecondaryButtonClick={onSecondaryButtonClick}
      {...props}
    >
      <div className={cs.stockHistoryCardContent}>
        <div className={cs.stockHistoryGrid}>
          <DndGridDataTable
            isLoading={isGridLoading}
            showHeader={false}
            columns={StockHistoryGridColumns}
            skeletonQuantity={data.length}
            data={data}
          />
        </div>
      </div>
    </SheProductCard>
  );
}
