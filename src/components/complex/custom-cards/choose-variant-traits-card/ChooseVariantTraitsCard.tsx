import { Plus } from "lucide-react";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ChooseVariantTraitsCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { TraitModel } from "@/const/models/TraitModel.ts";

export default function ChooseVariantTraitsCard({
  items,
  onAddTrait,
  onManageTrait,
  ...props
}) {
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
        <div className={cs.traitsItems}>
          {items.length > 0 &&
            items.map((item: TraitModel) => (
              <div key={item.traitId} className={cs.traitsItem}>
                <div className={cs.traitsItemBlock}>
                  <Checkbox className={cs.traitCheckbox} />
                  <div
                    className={cs.traitName}
                    onClick={() => onManageTrait("manageTrait", item.traitId)}
                  >
                    <span className="she-text">{item.traitName}</span>
                  </div>
                  <span>{item.traitTypeId}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </SheProductCard>
  );
}
