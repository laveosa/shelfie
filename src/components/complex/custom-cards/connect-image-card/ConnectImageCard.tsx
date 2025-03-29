import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ConnectImageCard.module.scss";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { IConnectImageCard } from "@/const/interfaces/complex-components/custom-cards/IConnectImageCard.ts";
import { ConnectImageGridColumns } from "@/components/complex/grid/connect-image-grid/ConnectImageGridColumns.tsx";

export default function ConnectImageCard({
  variants,
  data,
  onAction,
  onSecondaryButtonClick,
  ...props
}: IConnectImageCard) {
  const columns = ConnectImageGridColumns(onAction);

  return (
    <SheProductCard
      title="Connect image to product variants"
      view="card"
      showCloseButton
      width="350px"
      className={cs.connectImageCard}
      onSecondaryButtonClick={onSecondaryButtonClick}
      {...props}
    >
      <div className={cs.connectImageCardContent}>
        <div className={cs.connectImageGrid}>
          <DndGridDataTable
            enableDnd={true}
            showHeader={false}
            columns={columns}
            data={variants}
            gridModel={data}
          />
        </div>
      </div>
    </SheProductCard>
  );
}
