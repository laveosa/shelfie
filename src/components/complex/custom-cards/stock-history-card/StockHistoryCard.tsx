import React, { useEffect } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./StockHistoryCard.module.scss";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { StockHistoryGridColumns } from "@/components/complex/grid/stock-history-grid/StockHistoryGridColumns.tsx";
import { IVariantHistoryCard } from "@/const/interfaces/complex-components/custom-cards/IVariantHistoryCard.ts";
import { GridModel } from "@/const/models/GridModel.ts";

export default function StockHistoryCard({
  isLoading,
  variant,
  data,
  getVariantHistory,
  onSecondaryButtonClick,
  ...props
}: IVariantHistoryCard) {
  let gridData: GridModel = {};

  function getHistoryData(variantId) {
    getVariantHistory(variantId).then((res) => {
      gridData = res;
    });
    return gridData;
  }

  useEffect(() => {
    getHistoryData(variant.variantId);
  }, [variant]);

  return (
    <SheProductCard
      loading={isLoading}
      title={`${variant?.variantName} Stock History`}
      view="card"
      showCloseButton
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
            data={gridData.items}
            gridModel={gridData}
          />
        </div>
      </div>
    </SheProductCard>
  );
}
