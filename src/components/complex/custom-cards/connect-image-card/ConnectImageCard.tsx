import React from "react";

import cs from "./ConnectImageCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import { ConnectImageGridColumns } from "@/components/complex/grid/custom-grids/connect-image-grid/ConnectImageGridColumns.tsx";
import { IConnectImageCard } from "@/const/interfaces/complex-components/custom-cards/IConnectImageCard.ts";

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
  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.connectImageCard}
      title="Connect image to product variants"
      titleTransKey="CardTitles.ConnectImageToProductVariants"
      showCloseButton
      isLoading={isLoading}
      onSecondaryButtonClick={() => onAction("closeConnectImageCard")}
      {...props}
    >
      <div className={cs.connectImageCardContent}>
        <div className={cs.connectImageGrid}>
          <SheGrid
            isLoading={isGridLoading}
            showHeader={false}
            columns={ConnectImageGridColumns(onAction)}
            data={variants}
            skeletonQuantity={productCounter?.variants}
            gridRequestModel={variants as any}
          />
        </div>
      </div>
    </SheCard>
  );
}
