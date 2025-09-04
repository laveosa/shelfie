import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const reasons = [
    { reasonId: 1, reasonName: t("StockForm.Labels.Damaged") },
    { reasonId: 2, reasonName: t("StockForm.Labels.Lost") },
    { reasonId: 3, reasonName: t("StockForm.Labels.Broken") },
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
      title={`${t("StockActions.Dispose")} ${variant?.variantName} ${t("SectionTitles.Product")}`}
      showPrimaryButton={true}
      primaryButtonTitle={t("StockActions.Dispose")}
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
            {t("StockForm.Labels.CurrentlyInStock", { amount: variant.stockAmount && 0 })}
          </span>
        </div>
        <div className={cs.disposeFormBlock}>
          <SheForm form={form as any} onSubmit={onSubmit}>
            <SheForm.Field name="unitAmount">
              <SheInput
                label={t("PurchaseForm.Labels.Units")}
                type="number"
                placeholder={t("PurchaseForm.Placeholders.Units")}
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
                  <FormLabel>{t("StockForm.Labels.Reason")}</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value ? field.value.toString() : ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("SelectOptions.SelectCategory")} />
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
