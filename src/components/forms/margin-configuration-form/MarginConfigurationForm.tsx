import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef } from "react";
import _ from "lodash";

import useAppForm from "@/utils/hooks/useAppForm.ts";
import cs from "@/components/forms/margin-configuration-form/MarginConfigurationForm.module.scss";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { FormField } from "@/components/ui/form.tsx";
import SheFormItem from "@/components/complex/she-form/components/she-form-item/SheFormItem.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { MarginModelDefault } from "@/const/models/MarginModel.ts";
import MarginConfigurationFormScheme from "@/utils/validation/schemes/MarginConfigurationFormScheme.ts";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import { IMarginConfigurationCard } from "@/const/interfaces/forms/IMarginConfigurationForm.ts";
import { Separator } from "@/components/ui/separator.tsx";

interface SheNumericWithSuffixInputProps
  extends React.ComponentProps<typeof SheInput> {
  suffix?: string;
}

export function SheInputNumericWithSuffix({
  suffix,
  value,
  onChange,
  ...props
}: SheNumericWithSuffixInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const displayValue =
    value !== "" && value !== null && value !== undefined
      ? `${value}${suffix}`
      : "";

  const handleChange = (val: string | number) => {
    let input = String(val);

    input = input.replace(",", ".");

    const numeric = input.replace(/[^0-9.]/g, "");
    const parts = numeric.split(".");
    const normalized =
      parts.length > 1 ? `${parts[0]}.${parts.slice(1).join("")}` : parts[0];

    onChange?.(normalized ? Number(normalized) : "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const val = input.value;

    if (!suffix) return;

    if (
      (e.key === "Delete" || e.key === "ArrowRight") &&
      input.selectionStart === val.length - suffix.length &&
      val.endsWith(suffix)
    ) {
      e.preventDefault();
    }

    if (
      e.key === "Backspace" &&
      input.selectionStart === val.length - suffix.length &&
      val.endsWith(suffix)
    ) {
      e.preventDefault();
      const newVal = val.slice(0, -1 - suffix.length) + suffix;
      handleChange(newVal);
    }
  };

  const keepCursorBeforeSuffix = (
    e: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    const input = e.currentTarget;
    if (suffix && input.value.endsWith(suffix)) {
      if (input.selectionStart === input.value.length) {
        input.setSelectionRange(
          input.value.length - suffix.length,
          input.value.length - suffix.length,
        );
      }
    }
  };

  return (
    <SheInput
      {...props}
      ref={inputRef}
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onKeyUp={keepCursorBeforeSuffix}
      onClick={keepCursorBeforeSuffix}
      onFocus={keepCursorBeforeSuffix}
    />
  );
}

export default function MarginConfigurationForm<T>({
  className,
  data,
  isConfigurationCard = true,
  onSubmit,
  onCancel,
}: IMarginConfigurationCard<T>) {
  const form = useAppForm<any>({
    mode: "onSubmit",
    resolver: zodResolver(MarginConfigurationFormScheme),
    defaultValues: data || MarginModelDefault,
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    } else {
      form.reset(MarginModelDefault);
    }
  }, [data]);

  const isFormValid = true;
  // form.formState.isValid &&
  // form.getValues("marginName") &&
  // form.getValues("desiredProfit") &&
  // form.getValues("plannedDiscount") &&
  // form.getValues("fixedCosts");

  return (
    <div className={`${cs.marginConfiguration} ${className}`}>
      <SheForm<T>
        className={cs.marginConfigurationForm}
        form={form}
        defaultValues={MarginModelDefault}
        formPosition={DirectionEnum.CENTER}
        view={ComponentViewEnum.STANDARD}
        fullWidth
        hidePrimary
        hideSecondary
        onSubmit={onSubmit}
        onCancel={onCancel}
      >
        {isConfigurationCard && (
          <>
            <span className={`${cs.marginConfigurationText} she-text`}>
              This configuration allows you to automatically calculate the
              target prices based on conditions you set up and the product
              purchase price
            </span>
            <FormField
              control={form.control}
              name="marginName"
              defaultValue={data?.marginName}
              render={({ field }): React.ReactElement => (
                <SheFormItem
                  className={cs.marginConfigurationFormItem}
                  label="Margin Name"
                >
                  <SheInput
                    {...field}
                    fullWidth
                    placeholder="Enter margin name..."
                  />
                </SheFormItem>
              )}
            />

            {/*Commented until future notices*/}

            {/*<Separator />*/}
            {/*<div className={cs.selectSupplierBlock}>*/}
            {/*  <span className="she-title">*/}
            {/*    Automatic connection to purchase*/}
            {/*  </span>*/}
            {/*  <div className={cs.selectSupplierButton}>*/}
            {/*    <span className="she-text">*/}
            {/*      Select which supplier, will receive this margin connected*/}
            {/*      automatically*/}
            {/*    </span>*/}
            {/*    <SheButton*/}
            {/*      icon={Plus}*/}
            {/*      variant="secondary"*/}
            {/*      value="Select Supplier"*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}
            <Separator />
          </>
        )}
        <span className={`${cs.marginConfigurationTitle} she-title`}>
          {isConfigurationCard
            ? "Configure Margin Details"
            : "Adjust margin details for this purchase"}
        </span>
        <FormField
          control={form.control}
          name="marginRule.desiredProfit"
          render={({ field }) => (
            <SheFormItem
              label="Desired profit (in %)"
              className={cs.marginConfigurationFormItem}
            >
              <SheInputNumericWithSuffix
                placeholder="Enter profit..."
                value={field.value}
                suffix="%"
                onChange={(val) => field.onChange(val)}
              />
            </SheFormItem>
          )}
        />

        <span className={`${cs.marginConfigurationText} she-subtext`}>
          The profit is calculated based on the purchase price, other
          percentages do not intersect with it, but they result in single total
        </span>
        <FormField
          control={form.control}
          name="marginRule.plannedDiscount"
          render={({ field }) => (
            <SheFormItem
              label="Planned discount (in %)"
              className={cs.marginConfigurationFormItem}
            >
              <SheInputNumericWithSuffix
                placeholder="Enter planned discount..."
                value={field.value}
                suffix="%"
                onChange={(val) => field.onChange(val)}
              />
            </SheFormItem>
          )}
        />
        <span className={`${cs.marginConfigurationText} she-subtext`}>
          Planned discount is the part of the price you are planning to
          eventually reduce. For example, you can add 20 pln to the price of an
          item, so later, you could reduce the price automatically up to this
          amount. If you don’t want to budget for discount, just leave the field
          empty.
        </span>
        <FormField
          control={form.control}
          name="marginRule.fixedCosts"
          render={({ field }): React.ReactElement => (
            <SheFormItem
              className={cs.marginConfigurationFormItem}
              label="Fixed costs (in PLN)"
            >
              <SheInput
                {...field}
                fullWidth
                placeholder="Netto price"
                type="number"
              />
            </SheFormItem>
          )}
        />
        <span className={`${cs.marginConfigurationText} she-subtext`}>
          If you have fixed costs associated with every single purchase, this is
          a place to add them in. The fixed costs are for example cost of
          package, or fraction of the shipping fee. If you don’t want to count
          that in, leave the field empty.
        </span>
        <FormField
          control={form.control}
          name="roundTo"
          render={({ field }): React.ReactElement => (
            <SheFormItem className={cs.marginConfigurationFormItem}>
              <SheToggle
                {...field}
                placeholder="Netto price"
                text="Round Brutto price to full number"
                checked={
                  _.isNil(data?.marginRule?.roundTo)
                    ? false
                    : data?.marginRule?.roundTo
                }
                description="(This configuration rounds up all cents to full number)"
                type={SheToggleTypeEnum.SWITCH}
                onChecked={(value) => {
                  field.onChange(value || false);
                  void form.trigger("roundTo");
                }}
              />
            </SheFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nearest9"
          render={({ field }): React.ReactElement => (
            <SheFormItem className={cs.marginConfigurationFormItem}>
              <SheToggle
                {...field}
                placeholder="Netto price"
                text="Jump the price to nearest 9"
                checked={
                  _.isNil(data?.marginRule?.nearest9)
                    ? false
                    : data?.marginRule?.nearest9
                }
                description="(This configuration changes the last digit of the price to nearest 9. For example 61 will become 59, but 39 will become 39)"
                type={SheToggleTypeEnum.SWITCH}
                onChecked={(value) => {
                  field.onChange(value || false);
                  void form.trigger("nearest9");
                }}
              />
            </SheFormItem>
          )}
        />
        <div
          className={isConfigurationCard ? cs.buttonBlock : cs.oneButtonBlock}
        >
          {isConfigurationCard && (
            <SheButton value="Cancel" variant="secondary" onClick={onCancel} />
          )}
          <SheButton
            value={data ? "Save Changes" : "Create Margin"}
            type="submit"
            bgColor="#007AFF"
            disabled={!isFormValid}
          />
        </div>
      </SheForm>
    </div>
  );
}
