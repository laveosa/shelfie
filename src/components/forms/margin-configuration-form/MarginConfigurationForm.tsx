import React, { useRef } from "react";

import cs from "@/components/forms/margin-configuration-form/MarginConfigurationForm.module.scss";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import MarginConfigurationFormScheme from "@/utils/validation/schemes/MarginConfigurationFormScheme.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import { IMarginConfigurationForm } from "@/const/interfaces/forms/IMarginConfigurationForm.ts";
import { MarginModel, MarginModelDefault } from "@/const/models/MarginModel.ts";

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

    const allowedControlKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    const isNumberKey = /^[0-9.,]$/.test(e.key);
    const isControlKey = allowedControlKeys.includes(e.key);

    if (!isNumberKey && !isControlKey) {
      e.preventDefault();
      return;
    }

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

export default function MarginConfigurationForm({
  className,
  data,
  isConfigurationCard = true,
  onSubmit,
  onCancel,
}: IMarginConfigurationForm) {
  const { form } = useAppForm<MarginModel>({
    values: data,
    defaultValues: MarginModelDefault,
    scheme: MarginConfigurationFormScheme,
    mode: ReactHookFormMode.CHANGE,
  });

  return (
    <div className={`${cs.marginConfiguration} ${className}`}>
      <SheForm<MarginModel>
        className={cs.marginConfigurationForm}
        form={form}
        defaultValues={MarginModelDefault}
        formPosition={DirectionEnum.CENTER}
        fullWidth
        hideSecondaryBtn={!isConfigurationCard}
        primaryBtnProps={{
          value: data ? "Save Changes" : "Create Margin",
          bgColor: "#007AFF",
        }}
        footerClassName={
          !isConfigurationCard ? cs.formFooterOneButton : cs.formFooterTwoButton
        }
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
            <SheFormField
              name="marginName"
              className={cs.marginConfigurationFormItem}
              render={({ field }) => (
                <SheInput
                  label="Margin Name"
                  value={field.value}
                  fullWidth
                  placeholder="Enter margin name..."
                />
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
        <SheFormField
          name="marginRule.desiredProfit"
          label="Desired profit (in %)"
          className={cs.marginConfigurationFormItem}
          render={({ field }) => (
            <SheInputNumericWithSuffix
              placeholder="Enter profit..."
              value={field.value}
              suffix="%"
              fullWidth
              onChange={(val) => field.onChange(val)}
            />
          )}
        />
        <span className={`${cs.marginConfigurationText} she-subtext`}>
          The profit is calculated based on the purchase price, other
          percentages do not intersect with it, but they result in single total
        </span>
        <SheFormField
          name="marginRule.plannedDiscount"
          label="Planned discount (in %)"
          className={cs.marginConfigurationFormItem}
          render={({ field }) => (
            <SheInputNumericWithSuffix
              placeholder="Enter planned discount..."
              value={field.value}
              suffix="%"
              fullWidth
              onChange={(val) => field.onChange(val)}
            />
          )}
        />
        <span className={`${cs.marginConfigurationText} she-subtext`}>
          Planned discount is the part of the price you are planning to
          eventually reduce. For example, you can add 20 pln to the price of an
          item, so later, you could reduce the price automatically up to this
          amount. If you don’t want to budget for discount, just leave the field
          empty.
        </span>
        <SheFormField
          name="marginRule.fixedCosts"
          className={cs.marginConfigurationFormItem}
          render={({ field }) => (
            <SheInput
              label="Fixed costs (in PLN)"
              value={field.value}
              fullWidth
              placeholder="Netto price"
              type="number"
            />
          )}
        />
        <span className={`${cs.marginConfigurationText} she-subtext`}>
          If you have fixed costs associated with every single purchase, this is
          a place to add them in. The fixed costs are for example cost of
          package, or fraction of the shipping fee. If you don’t want to count
          that in, leave the field empty.
        </span>
        <SheFormField
          name="marginRule.roundTo"
          render={({ field }) => (
            <SheToggle
              text="Round Brutto price to full number"
              description="(This configuration rounds up all cents to full number)"
              type={SheToggleTypeEnum.SWITCH}
              checked={field.value}
            />
          )}
        ></SheFormField>
        <SheFormField
          name="marginRule.nearest9"
          render={({ field }) => (
            <SheToggle
              text="Jump the price to nearest 9"
              description="(This configuration changes the last digit of the price to nearest 9. For example 61 will become 59, but 39 will become 39)"
              type={SheToggleTypeEnum.SWITCH}
              checked={field.value}
            />
          )}
        ></SheFormField>
      </SheForm>
    </div>
  );
}
