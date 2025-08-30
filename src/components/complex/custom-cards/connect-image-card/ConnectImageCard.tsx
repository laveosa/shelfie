import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ConnectImageCard.module.scss";
import {
  DataWithId,
  DndGridDataTable,
} from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { ConnectImageGridColumns } from "@/components/complex/grid/connect-image-grid/ConnectImageGridColumns.tsx";
import { IConnectImageCard } from "@/const/interfaces/complex-components/custom-cards/IConnectImageCard.ts";
import { ColumnDef } from "@tanstack/react-table";

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
  function handleAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "switchAction":
        if (!payload.isActive) {
          onAction("connectImageToVariant", payload);
        } else {
          onAction("detachImageFromVariant", payload);
        }

        break;
    }
  }

  function onGridAction(
    actionType: string,
    _rowId?: string,
    _setLoadingRow?: (rowId: string, loading: boolean) => void,
    row?: any,
  ) {
    switch (actionType) {
      case "switchAction":
        handleAction("switchAction", row.original);
        break;
    }
  }

  return (
    <SheProductCard
      loading={isLoading}
      title="Connect image to product variants"
      showCloseButton
      className={cs.connectImageCard}
      onSecondaryButtonClick={onSecondaryButtonClick}
      {...props}
    >
      <div className={cs.connectImageCardContent}>
        <div className={cs.connectImageGrid}>
          <DndGridDataTable
            isLoading={isGridLoading}
            showHeader={false}
            columns={
              ConnectImageGridColumns(onGridAction) as ColumnDef<DataWithId>[]
            }
            data={variants}
            skeletonQuantity={productCounter?.variants}
            gridModel={variants as any}
          />
        </div>
      </div>
    </SheProductCard>
  );
}
