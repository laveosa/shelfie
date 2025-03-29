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

export default function AddVariantCard({
  sizes,
  colors,
  onAction,
  ...props
}: IAddVariantCard) {
  const form = useForm({
    defaultValues: {
      colors: "",
      sizes: "",
    },
  });

  const { colors: selectedColors, sizes: selectedSizes } = form.watch();

  const handlePrimaryButtonClick = () => {
    form.handleSubmit(
      (formData: { colors: string | null; sizes: string | null }) => {
        const optionIds = [];

        if (formData.colors) {
          const selectedColor = colors.find(
            (option) => option.optionName === formData.colors,
          );
          if (selectedColor?.optionId) optionIds.push(selectedColor.optionId);
        }

        if (formData.sizes) {
          const selectedSize = sizes.find(
            (option) => option.optionName === formData.sizes,
          );
          if (selectedSize?.optionId) optionIds.push(selectedSize.optionId);
        }

        const optionsData = { options: optionIds };

        onAction("addVariant", optionsData);
      },
    )();
  };

  const isPrimaryButtonDisabled = !selectedColors && !selectedSizes;

  return (
    <div>
      <SheProductCard
        title="Add Variant"
        view="card"
        showPrimaryButton={true}
        primaryButtonTitle="Add Variant"
        onPrimaryButtonClick={handlePrimaryButtonClick}
        primaryButtonDisabled={isPrimaryButtonDisabled}
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        onSecondaryButtonClick={() => onAction("closeAddVariantCard", null)}
        showCloseButton={true}
        className={cs.addVariantCard}
        {...props}
      >
        <div className={cs.addVariantCardContent}>
          <span className="she-text">
            Select the trait option that you want to add
          </span>
          <SheForm form={form} onSubmit={handlePrimaryButtonClick}>
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem className={cs.select}>
                  <FormLabel>Colors</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={colors.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {colors?.map((option) => (
                        <SelectItem
                          key={option.optionId}
                          value={option.optionName}
                        >
                          <div>{option.optionName}</div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem className={cs.select}>
                  <FormLabel>Sizes</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={sizes.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes?.map((option) => (
                        <SelectItem
                          key={option.optionId}
                          value={option.optionName}
                        >
                          <div>{option.optionName}</div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>
          </SheForm>
        </div>
      </SheProductCard>
    </div>
  );
}
