import { Plus } from "lucide-react";
import React from "react";

import cs from "./SelectEntityCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import { SheGrid } from "@/components/complex/grid/SheGrid.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { ISelectEntityCard } from "@/const/interfaces/complex-components/custom-cards/ISelectEntityCard.ts";

export default function SelectEntityCard<T = any>({
  isLoading,
  isGridLoading,
  entityName,
  entityCollection,
  columns,
  onAction,
}: ISelectEntityCard<T>) {
  const { translate } = useAppTranslation();

  return (
    <SheCard
      className={cs.selectEntityCard}
      title={translate("CardTitles.SelectEntity", { entityName })}
      isLoading={isLoading}
      showHeader
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSelectEntityCard")}
    >
      <div className={cs.selectEntityCardContent}>
        <div className={cs.selectEntityCardBlock}>
          <span className={`${cs.createEntityBlockText} she-text`}>
            {translate("EntityForm.Labels.MissingEntityPrompt", { entityName })}
          </span>
          <SheButton
            value={translate("EntityActions.CreateEntity", { entityName })}
            icon={Plus}
            variant="outline"
            onClick={() => onAction("openCreateEntityCard")}
          />
        </div>
        <div className={cs.entityListBlock}>
          <SheInput
            placeholder={translate("EntityForm.Placeholders.SearchEntity", {
              entityName,
            })}
            isSearch
            fullWidth
            showClearBtn
            onDelay={(data: string) => onAction("searchEntity", data)}
            onClear={() => onAction("searchEntity", null)}
          />
          <SheGrid
            data={entityCollection}
            isLoading={isGridLoading}
            showHeader={false}
            columns={columns}
            skeletonQuantity={10}
            customMessage={translate("EntityMessages.NoEntitiesCreated", {
              entityName,
            })}
          />
        </div>
      </div>
    </SheCard>
  );
}
