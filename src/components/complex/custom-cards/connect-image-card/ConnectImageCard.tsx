import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ConnectImageCard.module.scss";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";
import { ConnectImageGridColumns } from "@/components/complex/grid/connect-image-grid/ConnectImageGridColumns.tsx";

export default function ConnectImageCard({
  data,
  onAction,
  onSecondaryButtonClick,
  ...props
}) {
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
            showHeader={false}
            columns={columns}
            data={data}
            gridModel={data}
          />
        </div>
      </div>
    </SheProductCard>
  );
}
