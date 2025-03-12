import { Plus } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ChooseVariantTraitsCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function ChooseVariantTraitsCard({ onAddTrait, ...props }) {
  return (
    <SheProductCard
      title="Choose variant traits for product"
      view="card"
      primaryButtonTitle="Save"
      secondaryButtonTitle="Cancel"
      showCloseButton={true}
      className={cs.chooseVariantTraitsCard}
      width="370px"
      {...props}
    >
      <div className={cs.chooseVariantTraitsContent}>
        <div className={cs.textBlock}>
          <span className="she-text">
            Pick the traits that describe the variety of the product options you
            offer.
          </span>
          <span className="she-text"> Missing a trait? Add it!</span>
        </div>
        <SheButton icon={Plus} variant="outline" onClick={onAddTrait}>
          Add trait
        </SheButton>
      </div>
    </SheProductCard>
  );
}
