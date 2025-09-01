import { Check, Cog, Plus } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./ChooseVariantTraitsCard.module.scss";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { IChooseVariantTraitsCard } from "@/const/interfaces/complex-components/custom-cards/IChooseVariantTraitsCard.ts";
import SheTooltip from "@/components/primitive/she-tooltip/SheTooltip.tsx";

export default function ChooseVariantTraitsCard({
  isLoading,
  items,
  selectedItems,
  onAction,
  ...props
}: IChooseVariantTraitsCard) {
  const { t } = useTranslation();
  const [selectedTraitId, setSelectedTraitId] = useState<number | null>(null);
  const [checkedTraitIds, setCheckedTraitIds] = useState<number[]>(
    selectedItems?.map((item: TraitModel) => item.traitId),
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
      title={t("CardTitles.ChooseVariantTraitsForProduct")}
      showPrimaryButton={true}
      primaryButtonTitle={t("ProductActions.SaveTraits")}
      primaryButtonModel={{
        icon: Check,
        bgColor: "#007AFF",
      }}
      onPrimaryButtonClick={handleSave}
      showSecondaryButton={true}
      showCloseButton={true}
      className={cs.chooseVariantTraitsCard}
      {...props}
    >
      <div className={cs.chooseVariantTraitsContent}>
        <div className={cs.textBlock}>
          <span className="she-text">
            {t("ProductForm.Labels.PickTraitsDescription")}
          </span>
          <span className="she-text"> {t("ProductForm.Labels.MissingTraitPrompt")}</span>
        </div>
        <SheButton
          icon={Plus}
          variant="outline"
          onClick={() => onAction("addTrait", null)}
        >
          {t("ProductActions.AddTrait")}
        </SheButton>
        <div className={cs.traitsItemsWrapper}>
          <div className={cs.traitsItemsHeader}>
            <span className={`${cs.headerItemTrait} she-text`}>{t("ProductForm.Labels.Trait")}</span>
            <span className={`${cs.headerItemOptions} she-text`}>{t("ProductForm.Labels.Options")}</span>
            <span className={`${cs.headerItemAction} she-text`}>{t("ProductForm.Labels.Action")}</span>
          </div>
          <div className={cs.traitsItems}>
            {items?.length > 0 &&
              items?.map((item: TraitModel) => (
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
                      className={cs.traitNameBlock}
                      onClick={() => {
                        setSelectedTraitId(item.traitId);
                        onAction?.("manageTrait", item.traitId);
                      }}
                    >
                      <SheTooltip
                        delayDuration={200}
                        text={item.traitName}
                        className="max-w-[50px] min-w-[50px] overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        <span className={`${cs.traitName} she-text`}>
                          {item.traitName}
                        </span>
                      </SheTooltip>
                      <span className={`${cs.traitNameAmount} she-text`}>
                        {item.optionsAmount}
                      </span>
                    </div>
                    <SheButton
                      className={cs.traitButton}
                      variant="secondary"
                      icon={Cog}
                      value={t("ProductActions.Manage")}
                      minWidth="120px"
                      maxWidth="120px"
                      onClick={() => {
                        setSelectedTraitId(item.traitId);
                        onAction?.("manageTrait", item.traitId);
                      }}
                    />
                    {/*<div className={cs.traitDropdownMenu}>*/}
                    {/*  <DropdownMenu>*/}
                    {/*    <DropdownMenuTrigger asChild>*/}
                    {/*      <SheButton*/}
                    {/*        variant="secondary"*/}
                    {/*        className="flex h-8 p-0 data-[state=open]:bg-muted"*/}
                    {/*      >*/}
                    {/*        <MoreHorizontal />*/}
                    {/*      </SheButton>*/}
                    {/*    </DropdownMenuTrigger>*/}
                    {/*    <DropdownMenuContent align="start" className="w-[160px]">*/}
                    {/*      <DropdownMenuItem*/}
                    {/*        onClick={() => {*/}
                    {/*          queueMicrotask(() => {*/}
                    {/*            onAction?.("deleteTrait", item);*/}
                    {/*          });*/}
                    {/*        }}*/}
                    {/*      >*/}
                    {/*        <span className="she-text">{t("ProductActions.RemoveTrait")}</span>*/}
                    {/*      </DropdownMenuItem>*/}
                    {/*    </DropdownMenuContent>*/}
                    {/*  </DropdownMenu>*/}
                    {/*</div>*/}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </SheProductCard>
  );
}
