import React from "react";

import { Cog, ReceiptEuro, Undo2 } from "lucide-react";

import cs from "./MarginForPurchaseCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import MarginConfigurationForm from "@/components/forms/margin-configuration-form/MarginConfigurationForm.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { IMarginForPurchaseCard } from "@/const/interfaces/complex-components/custom-cards/IMarginForPurchaseCard.ts";

export default function MarginForPurchaseCard({
  isLoading,
  margin,
  onAction,
}: IMarginForPurchaseCard) {
  // ==================================================================== UTILITIES
  const { translate } = useAppTranslation();

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.marginForPurchaseCard}
      title="Margin For Purchase"
      titleTransKey="CardTitles.MarginForPurchase"
      isLoading={isLoading}
    >
      <div className={cs.marginForPurchaseCardContent}>
        <div className={cs.electedMarginBlock}>
          <span className="she-text">
            {translate("MarginForm.Labels.SelectMarginForPurchase")}
          </span>
          <SheButton
            value="Select Margin"
            valueTransKey="MarginActions.SelectMargin"
            icon={ReceiptEuro}
            variant="secondary"
            onClick={() => onAction("openSelectMarginCard")}
          />
        </div>
        {margin && (
          <div className={cs.marginDetails}>
            <div className={cs.marginActions}>
              <div className={cs.marginActionsTitleBlock}>
                <span
                  className={`${margin.isDeleted ? cs.marginIsDeletedTitle : ""} she-title`}
                >
                  {margin.marginName}
                </span>
              </div>
              <div className={cs.marginActionsButtonBlock}>
                {margin?.marginRule?.modified && (
                  <SheButton
                    icon={Undo2}
                    txtColor={"#fff"}
                    bgColor={"#007AFF"}
                    onClick={() =>
                      onAction("restoreMarginRules", margin.marginId)
                    }
                  />
                )}
                <SheButton
                  value="Manage"
                  valueTransKey="ProductActions.Manage"
                  icon={Cog}
                  variant="secondary"
                  onClick={() => onAction("manageMargin", margin)}
                />
              </div>
            </div>
            {margin.isDeleted && (
              <div className={cs.marginIsDeletedBlock}>
                <span className="she-text">
                  {translate("MarginMessages.MarginIsDeleted")}
                </span>
              </div>
            )}
            <Separator />
            <MarginConfigurationForm
              data={margin}
              isConfigurationCard={false}
              onSubmit={(formData) =>
                onAction("updateSelectedMargin", formData)
              }
            />
          </div>
        )}
      </div>
    </SheCard>
  );
}
