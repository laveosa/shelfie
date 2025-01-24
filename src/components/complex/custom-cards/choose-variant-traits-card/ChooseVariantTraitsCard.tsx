import { Plus } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ChooseVariantTraitsCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function ChooseVariantTraitsCard({ ...props }) {
  return (
    <SheProductCard
      title="Choose variant traits for product"
      view="card"
      showPrimaryButton={false}
      primaryButtonTitle="Save"
      showSecondaryButton={false}
      secondaryButtonTitle="Cancel"
      showCloseButton={true}
      className={cs.chooseVariantTraitsCard}
      width="350px"
      {...props}
    >
      <div className={cs.chooseVariantTraitsContent}>
        <div className={`${cs.textBlock} she-text`}>
          You have not defined any product traits yet
        </div>
        <SheButton icon={Plus}>Create product trait</SheButton>
      </div>
    </SheProductCard>
  );
}
