import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useTranslation } from "react-i18next";

import cs from "./StockHistoryCard.module.scss";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IVariantHistoryCard } from "@/const/interfaces/complex-components/custom-cards/IVariantHistoryCard.ts";
import { StockHistoryGridColumns } from "@/components/complex/grid/custom-grids/stock-history-grid/StockHistoryGridColumns.tsx";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export default function StockHistoryCard({
  isLoading,
  isGridLoading,
  variant,
  data,
  onAction,
  ...props
}: IVariantHistoryCard) {
  const { t } = useTranslation();

  return (
    <SheProductCard
      loading={isLoading}
      title={t("CardTitles.StockHistory", {
        variantName: variant?.variantName,
      })}
      showCloseButton
      className={cs.stockHistoryCard}
      onSecondaryButtonClick={() => onAction("closeVariantHistoryCard")}
      {...props}
    >
      <div className={cs.stockHistoryCardContent}>
        <div className={cs.stockHistoryGrid}>
          <SheGrid
            isLoading={isGridLoading}
            showHeader={false}
            columns={StockHistoryGridColumns as ColumnDef<DataWithId>[]}
            skeletonQuantity={data.length}
            data={data}
          />
        </div>
      </div>
    </SheProductCard>
  );
}
