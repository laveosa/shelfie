import React from "react";
import { useTranslation } from "react-i18next";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ConnectImageCard.module.scss";
import { DndGridDataTable } from "@/components/complex/grid/SheGrid.tsx";
import { ConnectImageGridColumns } from "@/components/complex/grid/custom-grids/connect-image-grid/ConnectImageGridColumns.tsx";
import { IConnectImageCard } from "@/const/interfaces/complex-components/custom-cards/IConnectImageCard.ts";
import { ColumnDef } from "@tanstack/react-table";
import { DataWithId } from "@/const/interfaces/complex-components/ISheGrid.ts";

export default function ConnectImageCard({
  isLoading,
  isGridLoading,
  variants,
  selectedPhoto,
  productCounter,
  onAction,
  onSecondaryButtonClick,
  ...props
}: IConnectImageCard) {
  const { t } = useTranslation();

  return (
    <SheProductCard
      loading={isLoading}
      title={t("CardTitles.ConnectImageToProductVariants")}
      showCloseButton
      className={cs.connectImageCard}
      onSecondaryButtonClick={() => onAction("closeConnectImageCard")}
      {...props}
    >
      <div className={cs.connectImageCardContent}>
        <div className={cs.connectImageGrid}>
          <DndGridDataTable
            isLoading={isGridLoading}
            showHeader={false}
            columns={
              ConnectImageGridColumns(onAction) as ColumnDef<DataWithId>[]
            }
            data={variants}
            skeletonQuantity={productCounter?.variants}
            gridRequestModel={variants as any}
          />
        </div>
      </div>
    </SheProductCard>
  );
}
