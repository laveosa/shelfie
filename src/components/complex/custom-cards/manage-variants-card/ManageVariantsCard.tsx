import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ManageVariantsCard.module.scss";
import React from "react";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { LayoutList, Plus } from "lucide-react";

export default function ManageVariantsCard({
  traits,
  onChooseVariantTraits,
  ...props
}) {
  return (
    <SheProductCard
      title="Manage Variants"
      view="card"
      showPrimaryButton={false}
      primaryButtonTitle="Save"
      showSecondaryButton={false}
      secondaryButtonTitle="Cancel"
      showCloseButton={true}
      className={cs.manageVariantsCard}
      width="350px"
      {...props}
    >
      <div className={cs.manageVariantsContent}>
        <div className={cs.textBlock}>
          <span className="she-text">
            The product is not described by traits yet. Please select at least
            one trait to create variants.
          </span>
        </div>
        <div className={cs.buttonBlock}>
          <SheButton
            icon={Plus}
            variant="outline"
            onClick={onChooseVariantTraits}
          >
            Create Variant
          </SheButton>
          {traits.length > 0 && (
            <>
              <span>or</span>
              <SheButton icon={LayoutList} variant="outline">
                Generate Set
              </SheButton>
            </>
          )}
        </div>
      </div>
    </SheProductCard>
  );
}
