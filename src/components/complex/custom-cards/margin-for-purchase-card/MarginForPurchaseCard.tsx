import { Cog, ReceiptEuro, Undo2 } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./MarginForPurchaseCard.module.scss";
import { IMarginForPurchaseCard } from "@/const/interfaces/complex-components/custom-cards/IMarginForPurchaseCard.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import MarginConfigurationForm from "@/components/forms/margin-configuration-form/MarginConfigurationForm.tsx";

export default function MarginForPurchaseCard({
  isLoading,
  margin,
  onAction,
}: IMarginForPurchaseCard) {
  const { t } = useTranslation();

  return (
    <SheProductCard
      loading={isLoading}
      title={t("CardTitles.MarginForPurchase")}
      className={cs.marginForPurchaseCard}
    >
      <div className={cs.marginForPurchaseCardContent}>
        <div className={cs.electedMarginBlock}>
          <span className="she-text">
            {t("MarginForm.Labels.SelectMarginForPurchase")}
          </span>
          <SheButton
            icon={ReceiptEuro}
            variant="secondary"
            value={t("MarginActions.SelectMargin")}
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
                  icon={Cog}
                  value={t("ProductActions.Manage")}
                  variant="secondary"
                  onClick={() => onAction("manageMargin", margin)}
                />
              </div>
            </div>
            {margin.isDeleted && (
              <div className={cs.marginIsDeletedBlock}>
                <span className="she-text">
                  {t("MarginMessages.MarginIsDeleted")}
                </span>
              </div>
            )}
            <Separator />
            <MarginConfigurationForm
              className={cs.marginConfigurationCardForm}
              data={margin}
              isConfigurationCard={false}
              onSubmit={(formData) =>
                onAction("updateSelectedMargin", formData)
              }
            />
          </div>
        )}
      </div>
    </SheProductCard>
  );
}
