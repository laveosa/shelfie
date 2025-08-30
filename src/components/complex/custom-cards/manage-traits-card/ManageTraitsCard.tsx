import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
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

interface TraitForm {
  [key: string]: string;
}

interface TraitOption {
  optionId: number;
  optionName: string;
  optionColor?: string | null;
  isRaw?: boolean;
}

interface Trait {
  traitId: number;
  traitName: string;
  traitTypeId: number;
  traitTypeName: string;
  optionsAmount: number;
  traitOptions: TraitOption[];
}

interface VariantTraitOption {
  optionId: number | null;
  optionName: string | null;
  optionColor: string | null;
  traitId: number;
  traitName: string;
  isMissing?: boolean;
  isRemoved?: boolean;
  color?: string;
}

export default function ManageTraitsCard({
  isLoading,
  traits,
  variant,
  onAction,
  onSecondaryButtonClick,
  ...props
}: IManageTraitsCard & {
  traits: Trait[];
  variant: {
    variantId: number;
    variantName: string;
    traitOptions: VariantTraitOption[];
    [key: string]: any;
  };
}) {
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

  const isFormIncomplete = Object.values(form.watch()).some((value) => !value);

  function onSubmit(data: TraitForm) {
    const optionIds = Object.values(data)
      .filter((value) => value !== "")
      .map((value) => Number(value));

    const submissionData = {
      options: optionIds,
    };

    onAction("updateVariantTraitOptions", { variant, submissionData });
  }

  return (
    <SheProductCard
      loading={isLoading}
      title={t("CardTitles.ManageTraits")}
      showPrimaryButton={true}
      primaryButtonTitle={t("CommonButtons.SaveChanges")}
      onPrimaryButtonClick={form.handleSubmit(onSubmit)}
      primaryButtonDisabled={isFormIncomplete}
      primaryButtonModel={{
        icon: Check,
        bgColor: "#007AFF",
      }}
      showSecondaryButton={true}
      secondaryButtonTitle={t("CommonButtons.Cancel")}
      onSecondaryButtonClick={onSecondaryButtonClick}
      showCloseButton
      className={cs.manageTraitsCard}
      {...props}
    >
      <div className={cs.manageTraitsCardContent}>
        <div className={cs.manageTraitsCardTextBlock}>
          <span className="she-text">{t("ProductForm.Labels.SelectTraitOptionsForVariant")}</span>
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
                                placeholder={t("ProductForm.Placeholders.SelectTraitType", { traitType: trait.traitTypeName.toLowerCase() })}
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
    </SheProductCard>
  );
}
