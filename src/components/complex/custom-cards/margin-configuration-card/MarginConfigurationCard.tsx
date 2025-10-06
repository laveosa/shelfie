import React from "react";

import { Plus, Trash2 } from "lucide-react";

import cs from "./MarginConfigurionCard.module.scss";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import MarginConfigurationForm from "@/components/forms/margin-configuration-form/MarginConfigurationForm.tsx";
import { IMarginConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IMarginConfigurationCard.ts";

export default function MarginConfigurationCard({
  isLoading,
  margin,
  onAction,
}: IMarginConfigurationCard) {
  return (
    <SheCard
      className={cs.marginConfigurationCard}
      title={margin ? "Manage Margin" : "Create Margin"}
      titleTransKey={
        margin ? "CardTitles.ManageMargin" : "CardTitles.CreateMargin"
      }
      showCloseButton
      isLoading={isLoading}
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
    </SheCard>
  );
}
