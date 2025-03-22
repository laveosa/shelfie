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

export default function AddVariantCard({
  sizes,
  colors,
  onAddVariantHandle,
  ...props
}) {
  const form = useForm({
    defaultValues: {
      colors: null,
      sizes: null,
    },
  });

  function onSubmit() {}

  console.log("ADDVARIANT", colors, sizes);

  return (
    <div>
      <SheProductCard
        title="Add Variant"
        view="card"
        showPrimaryButton={true}
        primaryButtonTitle="Add Variant"
        showSecondaryButton={true}
        secondaryButtonTitle="Cancel"
        className={cs.addVariantCard}
        {...props}
      >
        <div className={cs.addVariantCardContent}>
          <span className="she-text">
            Select the trait option that you want to add
          </span>
          <SheForm form={form} onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem className={cs.select}>
                  <FormLabel>Colors</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
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
