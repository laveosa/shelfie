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
  return (
    <SheProductCard
      loading={isLoading}
      className={cs.selectMarginCard}
      title={margin ? "Manage Margin" : "Create Margin"}
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeMarginConfigurationCard")}
    >
      <div className={cs.selectMarginCardContent}>
        <MarginConfigurationForm
          data={margin}
          onSubmit={(formData) => onAction("createMargin", formData)}
        />
      </div>
    </SheProductCard>
  );
}
