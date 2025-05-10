import React, { useEffect, useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ConnectImageCard.module.scss";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { ConnectImageGridColumns } from "@/components/complex/grid/connect-image-grid/ConnectImageGridColumns.tsx";
import { IConnectImageCard } from "@/const/interfaces/complex-components/custom-cards/IConnectImageCard.ts";

export default function ConnectImageCard({
  isGridLoading,
  variants,
  selectedPhoto,
  onAction,
  onSecondaryButtonClick,
  ...props
}: IConnectImageCard) {
  const columns = ConnectImageGridColumns(onGridAction);
  const [updatedVariants, setUpdatedVariants] = useState([]);

  useEffect(() => {
    console.log(isGridLoading);
  }, []);

  useEffect(() => {
    if (!selectedPhoto?.variants || !variants) return;

    const connectedIds = new Set(
      selectedPhoto.variants.map((v) => v.variantId),
    );

    const enrichedVariants = variants.map((variant) => ({
      ...variant,
      isConnected: connectedIds.has(variant.variantId),
    }));

    setUpdatedVariants(enrichedVariants);
  }, [selectedPhoto, variants]);

  function handleAction(actionType: string, payload?: any) {
    switch (actionType) {
      case "connect":
        onAction("connectImageToVariant", payload);
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
      case "connect":
        handleAction("connect", row.original);
        break;
    }
  }

  return (
    <SheProductCard
      title="Connect image to product variants"
      view="card"
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
            columns={columns}
            data={updatedVariants}
            gridModel={variants as any}
          />
        </div>
      </div>
    </SheProductCard>
  );
}
