import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

import cs from "./MarginConfigurionCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IMarginConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IMarginConfigurationCard.ts";
import MarginConfigurationForm from "@/components/forms/margin-configuration-form/MarginConfigurationForm.tsx";
import SheCardNotification from "@/components/complex/she-card-notification/SheCardNotification.tsx";

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
      title={margin ? t("CardTitles.ManageMargin") : t("CardTitles.CreateMargin")}
      showCloseButton
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
        {margin && (
          <div>
            {!margin?.isDeleted ? (
              <SheCardNotification
                title={t("CardTitles.DeleteMargin")}
                text={t("ConfirmationMessages.DeleteMargin")}
                buttonIcon={Trash2}
                buttonVariant="outline"
                buttonText={t("CommonButtons.Delete")}
                buttonColor="#EF4343"
                onClick={() => onAction("deleteMargin", margin)}
              />
            ) : (
              <SheCardNotification
                title={t("CardTitles.RestoreMargin")}
                text={t("ConfirmationMessages.RestoreMargin")}
                buttonIcon={Plus}
                buttonVariant="outline"
                buttonText={t("CommonButtons.Restore")}
                buttonColor="#38BF5E"
                onClick={() => onAction("restoreMargin", margin)}
              />
            )}
          </div>
        )}
      </div>
    </SheProductCard>
  );
}
