import { useForm } from "react-hook-form";
import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
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

interface TraitForm {
  [key: string]: string;
}

export default function AddVariantCard({
  traits,
  onAction,
  ...props
}: IAddVariantCard) {
  const defaultValues = traits.reduce(
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
    onAction("addVariant", submissionData);
  }

  const isPrimaryButtonDisabled = Object.values(form.getValues()).every(
    (value) => value === "",
  );

  return (
    <div>
      <SheProductCard
        title="Add Variant"
        view="card"
        showPrimaryButton={true}
        primaryButtonTitle="Add Variant"
        onPrimaryButtonClick={form.handleSubmit(onSubmit)}
        primaryButtonDisabled={isPrimaryButtonDisabled}
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        onSecondaryButtonClick={() => onAction("closeAddVariantCard")}
        showCloseButton={true}
        className={cs.addVariantCard}
        {...props}
      >
        <div className={cs.addVariantCardContent}>
          <span className={`${cs.addVariantCardText} she-text`}>
            Select the trait options that you want to add
          </span>
          <SheForm form={form} onSubmit={onSubmit}>
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
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={`Select ${trait.traitTypeName.toLowerCase()}`}
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
                                      background: option?.optionColor || "#ccc",
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
          </SheForm>
        </div>
      </SheProductCard>
    </div>
  );
}
