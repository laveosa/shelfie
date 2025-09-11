import { Plus } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import cs from "./SelectEntityCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { ISelectEntityCard } from "@/const/interfaces/complex-components/custom-cards/ISelectEntityCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { DndGridDataTable } from "@/components/complex/grid/DndGrid.tsx";

export default function SelectEntityCard({
  isLoading,
  isGridLoading,
  entityName,
  entityCollection,
  columns,
  onAction,
}: ISelectEntityCard) {
  const { t } = useTranslation();

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.selectEntityCard}
      title={t("CardTitles.SelectEntity", { entityName })}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSelectEntityCard")}
    >
      <div className={cs.selectEntityCardContent}>
        <div className={cs.selectEntityCardBlock}>
          <span className={`${cs.createEntityBlockText} she-text`}>
            {t("EntityForm.Labels.MissingEntityPrompt", { entityName })}
          </span>
          <SheButton
            icon={Plus}
            value={t("EntityActions.CreateEntity", { entityName })}
            variant="outline"
            onClick={() => onAction("openCreateEntityCard")}
          />
        </div>
        <div className={cs.entityListBlock}>
          <SheInput
            isSearch
            fullWidth
            showClearBtn
            placeholder={t("EntityForm.Placeholders.SearchEntity", {
              entityName,
            })}
            onDelay={(data: string) => onAction("searchEntity", data)}
            onClear={() => onAction("searchEntity", null)}
          />
          <DndGridDataTable
            isLoading={isGridLoading}
            showHeader={false}
            columns={columns}
            data={entityCollection}
            skeletonQuantity={10}
            customMessage={t("EntityMessages.NoEntitiesCreated", {
              entityName,
            })}
          />
        </div>
      </div>
    </SheProductCard>
  );
}
