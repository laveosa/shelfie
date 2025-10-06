import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import React from "react";

import cs from "./AddVariantCard.module.scss";
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
import { IAddVariantCard } from "@/const/interfaces/complex-components/custom-cards/IAddVariantCard.ts";
import SheCard from "@/components/complex/she-card/SheCard.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";

interface TraitForm {
  [key: string]: string;
}

export default function AddVariantCard({
  isLoading,
  traits,
  isDuplicateVariant,
  onAction,
  ...props
}: IAddVariantCard) {
  const { translate } = useAppTranslation();

  const defaultValues = traits?.reduce(
    (acc, trait) => ({
      ...acc,
      [trait.traitId]: "",
    }),
    {} as TraitForm,
  );

  const form = useForm<TraitForm>({
    defaultValues,
  });

  function onSubmit(data: TraitForm) {
    const optionIds = Object.values(data)
      .filter((value) => value !== "")
      .map((value) => Number(value));

    const submissionData = {
      options: optionIds,
    };
    if (!isDuplicateVariant) {
      onAction("addVariant", submissionData);
    } else {
      onAction("addDuplicatedVariant", submissionData);
    }
  }

  const isPrimaryButtonDisabled = Object.values(form.getValues()).every(
    (value) => value === "",
  );

  return (
    <SheCard
      className={cs.addVariantCard}
      title="Add Variant"
      titleTransKey="ProductActions.AddVariant"
      isLoading={isLoading}
      showCloseButton
      showFooter
      primaryButtonProps={{
        value: "Add Variant",
        valueTransKey: "ProductActions.AddVariant",
        icon: Plus,
        variant: "info",
        disabled: isPrimaryButtonDisabled,
      }}
      onSecondaryButtonClick={() => onAction("closeAddVariantCard")}
      onPrimaryButtonClick={form.handleSubmit(onSubmit)}
      {...props}
    >
      <div className={cs.addVariantCardContent}>
        <span className="she-text">
          {translate("ProductForm.Labels.SelectTraitOptions")}
        </span>
        <SheForm form={form} onSubmit={onSubmit}>
          {traits?.map((trait) => (
            <FormField
              key={trait.traitId}
              control={form.control}
              name={trait.traitId.toString()}
              render={({ field }) => {
                return (
                  <div
                    className={cs.addVariantCardFormItem}
                    style={
                      isDuplicateVariant
                        ? { paddingBottom: "10px" }
                        : { paddingBottom: "20px" }
                    }
                  >
                    <FormItem
                      className={
                        !isDuplicateVariant ? cs.select : cs.warningColorSelect
                      }
                    >
                      <FormLabel>{trait.traitName}</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={translate(
                                "ProductForm.Placeholders.SelectTraitType",
                                {
                                  traitType: trait.traitTypeName.toLowerCase(),
                                },
                              )}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {trait.traitOptions
                            .filter((option) => !option.isRaw)
                            .map((option) => (
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
                  </div>
                );
              }}
            />
          ))}
        </SheForm>
        {isDuplicateVariant && (
          <span className={cs.warningText}>
            {translate("ValidationMessages.DuplicateVariantWarning")}
          </span>
        )}
      </div>
    </SheCard>
  );
}
