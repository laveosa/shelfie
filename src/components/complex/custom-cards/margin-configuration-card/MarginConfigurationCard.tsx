import { Plus, Trash2 } from "lucide-react";
import React from "react";

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
  return (
    <SheProductCard
      loading={isLoading}
      className={cs.marginConfigurationCard}
      title={margin ? "Manage Margin" : "Create Margin"}
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
                title="Delete Margin"
                text="This margin will be deleted and will no longer be available for selection or automatic connection"
                buttonIcon={Trash2}
                buttonVariant="outline"
                buttonText="Delete"
                buttonColor="#EF4343"
                onClick={() => onAction("deleteMargin", margin)}
              />
            ) : (
              <SheCardNotification
                title="Restore Margin"
                text="The margin was deleted and is no longer manageable. "
                buttonIcon={Plus}
                buttonVariant="outline"
                buttonText="Restore"
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
