import React from "react";

import SheProductCard from "@/components/complex/she-product-card/SheProductCard.tsx";
import cs from "./DisposeStockCard.module.scss";
import { useForm } from "react-hook-form";
import { SheForm } from "@/components/forms/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { IDisposeStockCard } from "@/const/interfaces/complex-components/custom-cards/IDisposeStockCard.ts";

export default function DisposeStockCard({
  variant,
  onAction,
  onSecondaryButtonClick,
  ...props
}: IDisposeStockCard) {
  const form = useForm({
    defaultValues: {
      units: "",
      reason: "",
    },
  });

  function onSubmit(data) {
    onAction(data);
  }

  return (
    <SheProductCard
      title={`Dispose ${variant?.variantName} Stock`}
      view="card"
      showPrimaryButton={true}
      primaryButtonTitle="Dispose"
      showSecondaryButton={true}
      secondaryButtonTitle="Cancel"
      onSecondaryButtonClick={onSecondaryButtonClick}
      showCloseButton
      className={cs.disposeStockCard}
      {...props}
    >
      <div className={cs.disposeStockCardContent}>
        <div className={cs.currentlyStockBlock}>
          <span className="she-text">
            {`Currently in stock : ${variant.stockAmount && 0}`}
          </span>
        </div>
        <div className={cs.disposeFormBlock}>
          <SheForm form={form} onSubmit={onSubmit}>
            <SheForm.Field name="units">
              <SheInput
                label="Units"
                type="number"
                placeholder="enter amount of units..."
                showError={true}
              />
            </SheForm.Field>
            <FormField
              control={form.control}
              name="reason"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormItem className={cs.select}>
                  <FormLabel>Product Category</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value ? field.value.toString() : ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/*{categoriesList.map((option) => (*/}
                      {/*  <SelectItem*/}
                      {/*    key={option.categoryId}*/}
                      {/*    value={option.categoryId.toString()}*/}
                      {/*  >*/}
                      {/*    <div>{option.categoryName}</div>*/}
                      {/*  </SelectItem>*/}
                      {/*))}*/}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>
          </SheForm>
        </div>
      </div>
    </SheProductCard>
  );
}
