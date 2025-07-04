import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./MarginForPurchaseCard.module.scss";
import { IMarginForPurchaseCard } from "@/const/interfaces/complex-components/custom-cards/IMarginForPurchaseCard.ts";

export default function MarginForPurchaseCard({
  isLoading,
  onAction,
  ...props
}: IMarginForPurchaseCard) {
  return (
    <div>
      <SheProductCard
        loading={isLoading}
        title="Add Variant"
        showPrimaryButton={true}
        primaryButtonTitle="Add Variant"
        // onPrimaryButtonClick={}
        showSecondaryButton={true}
        onSecondaryButtonClick={() => onAction("closeAddVariantCard")}
        showCloseButton
        className={cs.marginForPurchaseCard}
        {...props}
      >
        <div className={cs.marginForPurchaseCardContent}></div>
      </SheProductCard>
    </div>
  );
}
