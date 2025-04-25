import { useForm } from "react-hook-form";
import React from "react";

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

export default function ManageTraitsCard({
  traits,
  variant,
  onAction,
  onSecondaryButtonClick,
  ...props
}: IManageTraitsCard) {
  const validVariantOptions = (variant?.traitOptions || []).filter(
    (opt) => opt.isRemoved && opt.optionId !== null,
  );

  const defaultValues = traits.reduce((acc, trait) => {
    const matchedOption = validVariantOptions.find(
      (vo) => vo.traitName === trait.traitName,
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
      title="Manage Traits"
      view="card"
      showPrimaryButton={true}
      primaryButtonTitle="Update Traits"
      onPrimaryButtonClick={form.handleSubmit(onSubmit)}
      primaryButtonDisabled={isFormIncomplete}
      showSecondaryButton={true}
      secondaryButtonTitle="Cancel"
      onSecondaryButtonClick={onSecondaryButtonClick}
      showCloseButton
      className={cs.manageTraitsCard}
      {...props}
    >
      <div className={cs.manageTraitsCardContent}>
        <div className={cs.manageTraitsCardTextBlock}>
          <span className="she-text">Select the trait options for variant</span>
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
