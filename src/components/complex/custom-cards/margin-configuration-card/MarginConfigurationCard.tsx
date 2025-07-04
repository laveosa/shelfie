import React from "react";

import cs from "./MarginConfigurionCard.module.scss";
import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import { IMarginConfigurationCard } from "@/const/interfaces/complex-components/custom-cards/IMarginConfigurationCard.ts";

export default function MarginConfigurationCard({
  isLoading,
  margin,
  onAction,
}: IMarginConfigurationCard) {
  return (
    <SheProductCard
      loading={isLoading}
      className={cs.selectMarginCard}
      title="Select Margin"
      showCloseButton
      onSecondaryButtonClick={() => onAction("closeSelectSupplierCard")}
    >
      <div className={cs.selectMarginCardContent}></div>
    </SheProductCard>
  );
}
