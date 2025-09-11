import { useTranslation } from "react-i18next";
import { Plus, Trash2 } from "lucide-react";
import React from "react";

import cs from "./MarginConfigurionCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IMarginConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IMarginConfigurationCard.ts";
import MarginConfigurationForm from "@/components/forms/margin-configuration-form/MarginConfigurationForm.tsx";

export default function MarginConfigurationCard({
  isLoading,
  margin,
  onAction,
}: IMarginConfigurationCard) {
  const { t } = useTranslation();

  return (
    <SheProductCard
      loading={isLoading}
      className={cs.marginConfigurationCard}
      title={
        margin ? t("CardTitles.ManageMargin") : t("CardTitles.CreateMargin")
      }
      showCloseButton
      showNotificationCard={margin}
      notificationCardProps={{
        title: margin?.isDeleted ? "RestoreMargin" : "Delete Margin",
        titleTransKey: margin?.isDeleted
          ? "CardTitles.RestoreMargin"
          : "CardTitles.DeleteMargin",
        text: margin?.isDeleted
          ? "The margin was deleted and is no longer manageable."
          : "This margin will be deleted and will no longer be available for selection or automatic connection",
        textTransKey: margin?.isDeleted
          ? "ConfirmationMessages.RestoreMargin"
          : "ConfirmationMessages.DeleteMargin",
        buttonText: margin?.isDeleted ? "Restore" : "Delete",
        buttonTextTransKey: margin?.isDeleted
          ? "CommonButtons.Restore"
          : "CommonButtons.Delete",
        buttonColor: margin?.isDeleted ? "#38BF5E" : "#EF4343",
        buttonIcon: margin?.isDeleted ? Plus : Trash2,
        onClick: () =>
          margin?.isDeleted
            ? onAction("restoreMargin", margin)
            : onAction("deleteMargin", margin),
      }}
      onSecondaryButtonClick={() => onAction("closeMarginConfigurationCard")}
    >
      <div className={cs.marginConfigurationCardContent}>
        <MarginConfigurationForm
          className={cs.marginConfigurationCardForm}
          data={margin}
          onSubmit={(formData) =>
            onAction(margin ? "updateMargin" : "createMargin", formData)
          }
          onCancel={() => onAction("closeMarginConfigurationCard")}
        />
      </div>
    </SheProductCard>
  );
}
