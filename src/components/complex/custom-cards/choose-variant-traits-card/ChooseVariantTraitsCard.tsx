import { MoreHorizontal, Plus } from "lucide-react";
import React, { useState } from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ChooseVariantTraitsCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { IChooseVariantTraitsCard } from "@/const/interfaces/complex-components/custom-cards/IChooseVariantTraitsCard.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

export default function ChooseVariantTraitsCard({
  isLoading,
  items,
  selectedItems,
  onAction,
  ...props
}: IChooseVariantTraitsCard) {
  const [selectedTraitId, setSelectedTraitId] = useState<number | null>(null);
  const [checkedTraitIds, setCheckedTraitIds] = useState<number[]>(
    selectedItems.map((item: TraitModel) => item.traitId),
  );

  function handleCheckboxChange(traitId: number, checked: boolean) {
    setCheckedTraitIds((prev) =>
      checked ? [...prev, traitId] : prev.filter((id) => id !== traitId),
    );
  }

  function handleSave() {
    onAction?.("setProductTraits", { traitIds: checkedTraitIds });
  }

  return (
    <SheProductCard
      loading={isLoading}
      title="Choose variant traits for product"
      view="card"
      showPrimaryButton={true}
      primaryButtonTitle="Save"
      onPrimaryButtonClick={handleSave}
      showSecondaryButton={true}
      secondaryButtonTitle="Cancel"
      showCloseButton={true}
      className={cs.chooseVariantTraitsCard}
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
        <SheButton
          icon={Plus}
          variant="outline"
          onClick={() => onAction("addTrait", null)}
        >
          Add trait
        </SheButton>
        <div className={cs.traitsItems}>
          {items.length > 0 &&
            items.map((item: TraitModel) => (
              <div
                key={item.traitId}
                className={`${cs.traitsItem} ${selectedTraitId === item.traitId ? cs.selected : ""}`}
              >
                <div className={cs.traitsItemBlock}>
                  <Checkbox
                    className={cs.traitCheckbox}
                    checked={checkedTraitIds.includes(item.traitId)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(item.traitId, !!checked)
                    }
                  />
                  <div
                    className={cs.traitName}
                    onClick={() => {
                      setSelectedTraitId(item.traitId);
                      onAction?.("manageTrait", item.traitId);
                    }}
                  >
                    <span className="she-text">{item.traitName}</span>
                    <span>{item.optionsAmount}</span>
                  </div>
                  <SheButton
                    className={cs.traitButton}
                    variant="default"
                    value="Manage"
                    minWidth="65px"
                    maxWidth="65px"
                    onClick={() => {
                      setSelectedTraitId(item.traitId);
                      onAction?.("manageTrait", item.traitId);
                    }}
                  />
                  <div className={cs.traitDropdownMenu}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SheButton
                          variant="secondary"
                          className="flex h-8 p-0 data-[state=open]:bg-muted"
                        >
                          <MoreHorizontal />
                        </SheButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-[160px]">
                        <DropdownMenuItem
                          onClick={() => {
                            queueMicrotask(() => {
                              onAction?.("deleteTrait", item.traitId);
                            });
                          }}
                        >
                          <span className="she-text">Remove trait</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </SheProductCard>
  );
}
