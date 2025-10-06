import { useForm } from "react-hook-form";
import React, { JSX, useEffect } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

import cs from "./ManageTraitsCard.module.scss";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { IManageTraitsCard } from "@/const/interfaces/complex-components/custom-cards/IManageTraitsCard.ts";
import SheCard from "@/components/complex/she-card/SheCard.tsx";

interface TraitForm {
  [key: string]: string;
}

export default function ManageTraitsCard({
  isLoading,
  traits,
  variant,
  onAction,
  onSecondaryButtonClick,
  ...props
}: IManageTraitsCard): JSX.Element {
  const { t } = useTranslation();
  const variantTraitOptions = variant?.traitOptions || [];
  const defaultValues = traits.reduce((acc, trait) => {
    const matchedOption = variantTraitOptions.find(
      (vo) => vo.traitName === trait.traitName && vo.optionId !== null,
    );

    return {
      ...acc,
      [trait.traitId]: matchedOption?.optionId?.toString() || "",
    };
  }, {} as TraitForm);

  const form = useForm<TraitForm>({
    defaultValues,
  });
  const isFormIncomplete = Object.values(form.watch()).some((value) => !value);

  useEffect(() => {
    if (variant?.traitOptions) {
      const newValues = traits.reduce((acc, trait) => {
        const matchedOption = variantTraitOptions.find(
          (vo) => vo.traitName === trait.traitName && vo.optionId !== null,
        );

        return {
          ...acc,
          [trait.traitId]: matchedOption?.optionId?.toString() || "",
        };
      }, {} as TraitForm);

      Object.entries(newValues).forEach(([fieldName, value]) => {
        form.setValue(fieldName, value);
      });
    }
  }, [variant, traits, variantTraitOptions]);

  function onSubmit(data: TraitForm) {
    const optionIds = Object.values(data)
      .filter((value) => value !== "")
      .map((value) => Number(value));

    const submissionData = {
      options: optionIds,
    };

    onAction("updateVariantTraitOptions", { variant, submissionData });
  }

  // ==================================================================== LAYOUT
  return (
    <SheCard
      className={cs.manageTraitsCard}
      title="Manage Traits"
      titleTransKey="CardTitles.ManageTraits"
      showCloseButton
      isLoading={isLoading}
      showFooter
      primaryButtonProps={{
        value: "Save Changes",
        valueTransKey: "CommonButtons.SaveChanges",
        variant: "info",
        icon: Check,
        disabled: isFormIncomplete,
      }}
      secondaryButtonTitle="Cancel"
      secondaryButtonTitleTransKey="CommonButtons.Cancel"
      onPrimaryButtonClick={form.handleSubmit(onSubmit)}
      onSecondaryButtonClick={onSecondaryButtonClick}
      {...props}
    >
      <div className={cs.manageTraitsCardContent}>
        <div className={cs.manageTraitsCardTextBlock}>
          <span className="she-text">
            {t("ProductForm.Labels.SelectTraitOptionsForVariant")}
          </span>
        </div>
        <div>
          <SheForm form={form} onSubmit={onSubmit}>
            <div className={cs.manageTraitsCardForm}>
              {traits.map((trait) => (
                <FormField
                  key={trait.traitId}
                  control={form.control}
                  name={trait.traitId.toString()}
                  render={({ field }) => {
                    return (
                      <FormItem className={cs.select}>
                        <FormLabel>{trait.traitName}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t(
                                  "ProductForm.Placeholders.SelectTraitType",
                                  {
                                    traitType:
                                      trait.traitTypeName.toLowerCase(),
                                  },
                                )}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {trait.traitOptions.map((option) => (
                              <SelectItem
                                key={option.optionId}
                                value={option.optionId.toString()}
                              >
                                {trait.traitTypeId === 2 ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        background:
                                          option?.optionColor || "#ccc",
                                        marginRight: "8px",
                                        borderRadius: "2px",
                                      }}
                                    ></div>
                                    {option.optionName}
                                  </div>
                                ) : (
                                  option.optionName
                                )}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </SheForm>
        </div>
      </div>
    </SheCard>
  );
}
