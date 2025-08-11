import { Plus } from "lucide-react";
import React from "react";

import cs from "./SelectEntityCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { ISelectEntityCard } from "@/const/interfaces/complex-components/custom-cards/ISelectEntityCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { DndGridDataTable } from "@/components/complex/grid/dnd-grid/DndGrid.tsx";

export default function SelectEntityCard({
  isLoading,
  isGridLoading,
  entityName,
  entityCollection,
  columns,
  onAction,
}: ISelectEntityCard) {
  return (
    <SheProductCard
      loading={isLoading}
      className={cs.selectEntityCard}
      title={`Select ${entityName}`}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSelectEntityCard")}
    >
      <div className={cs.selectEntityCardContent}>
        <div className={cs.selectEntityCardBlock}>
          <span className={`${cs.createEntityBlockText} she-text`}>
            {`Missing a ${entityName}? Create one!`}
          </span>
          <SheButton
            icon={Plus}
            value={`Create ${entityName}`}
            variant="outline"
            onClick={() => onAction("openCreateEntityCard")}
          />
        </div>
        <div className={cs.entityListBlock}>
          <SheInput
            isSearch
            fullWidth
            placeholder={`Search ${entityName}...`}
            onDelay={(data: string) => onAction("searchEntity", data)}
          />
          <DndGridDataTable
            isLoading={isGridLoading}
            showHeader={false}
            columns={columns}
            data={entityCollection}
            skeletonQuantity={10}
            customMessage={`There are no ${entityName} created yet`}
          />
        </div>
      </div>
    </SheProductCard>
  );
}
