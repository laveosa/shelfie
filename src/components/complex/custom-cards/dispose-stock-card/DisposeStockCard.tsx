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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { IDisposeStockCard } from "@/const/interfaces/complex-components/custom-cards/IDisposeStockCard.ts";

export default function DisposeStockCard({
  isLoading,
  variant,
  onAction,
  onSecondaryButtonClick,
  ...props
}: IDisposeStockCard) {
  const reasons = [
    { reasonId: 1, reasonName: "Damaged" },
    { reasonId: 2, reasonName: "Lost" },
    { reasonId: 3, reasonName: "Broken" },
  ];

  const form = useForm({
    defaultValues: {
      unitAmount: 0,
      reason: reasons?.[0].reasonName,
    },
  });

  function onSubmit(data) {
    const formattedData = {
      ...data,
      unitAmount: Number(data.unitAmount),
    };
    onAction("disposeFromStock", { variant, formattedData });
  }

  return (
    <SheProductCard
      loading={isLoading}
      title={`Dispose ${variant?.variantName} Stock`}
      showPrimaryButton={true}
      primaryButtonTitle="Dispose"
      showSecondaryButton={true}
      onPrimaryButtonClick={form.handleSubmit(onSubmit)}
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
            <SheForm.Field name="unitAmount">
              <SheInput
                label="Units"
                type="number"
                placeholder="enter amount of units..."
                showError={true}
                fullWidth
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
                  <FormLabel>Reason</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value ? field.value.toString() : ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {reasons.map((reason) => (
                        <SelectItem
                          key={reason.reasonId}
                          value={reason.reasonName.toString()}
                        >
                          <div>{reason.reasonName}</div>
                        </SelectItem>
                      ))}
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
