import React, { JSX, useEffect } from "react";
import { cn } from "@/lib/utils.ts";

import cs from "./SheTimePickerInput.module.scss";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import {
  getArrowByType,
  getDateByType,
  setDateByType,
} from "@/utils/helpers/time-picker-helper.ts";
import { ISheTimePickerInput } from "@/const/interfaces/primitive-components/ISheTimePickerInput.ts";

export default function SheTimePickerInput({
  id,
  className = "",
  value,
  date = new Date(new Date().setHours(0, 0, 0, 0)),
  type = "tel",
  name,
  picker,
  period,
  setDate,
  onKeyDown,
  onLeftFocus,
  onRightFocus,
  onChange,
  onBlurHandler,
  ...props
}: ISheTimePickerInput): JSX.Element {
  // ==================================================================== STATE MANAGEMENT
  const [flag, setFlag] = React.useState<boolean>(false);
  const [prevIntKey, setPrevIntKey] = React.useState<string>("0");

  // ==================================================================== UTILITIES
  const calculatedValue = React.useMemo(() => {
    return getDateByType(date, picker);
  }, [date, picker]);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (flag) {
      const timer = setTimeout(() => {
        setFlag(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [flag]);

  // ==================================================================== EVENT HANDLERS
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab") return;

    event.preventDefault();

    if (event.key === "ArrowRight") onRightFocus?.();

    if (event.key === "ArrowLeft") onLeftFocus?.();

    if (["ArrowUp", "ArrowDown"].includes(event.key)) {
      const step = event.key === "ArrowUp" ? 1 : -1;
      const newValue = getArrowByType(calculatedValue, step, picker);

      if (flag) setFlag(false);

      const tempDate = new Date(date);
      setDate(setDateByType(tempDate, newValue, picker, period), event);
    }

    if (event.key >= "0" && event.key <= "9") {
      if (picker === "12hours") setPrevIntKey(event.key);

      const newValue = _calculateNewValue(event.key);

      if (flag) onRightFocus?.();

      setFlag((prev) => !prev);
      const tempDate = new Date(date);
      setDate(setDateByType(tempDate, newValue, picker, period), event);
    }
  }

  // ==================================================================== PRIVATE
  function _calculateNewValue(key: string) {
    if (picker === "12hours") {
      if (flag && calculatedValue.slice(1, 2) === "1" && prevIntKey === "0")
        return "0" + key;
    }

    return !flag ? "0" + key : calculatedValue.slice(1, 2) + key;
  }

  // ==================================================================== LAYOUT
  return (
    <SheInput
      id={id || picker}
      className={`${cs.sheTimePickerInput} ${cn(
        "tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none",
        className,
      )}`}
      name={name || picker}
      value={value || calculatedValue}
      type={type}
      inputMode="decimal"
      onKeyDown={(event: any) => {
        onKeyDown?.(event);
        handleKeyDown(event);
      }}
      onChange={(event: any) => {
        event.preventDefault();
        onChange?.(event);
      }}
      onBlur={(value: any, { event }) => {
        const tempDate = new Date(date);
        onBlurHandler(setDateByType(tempDate, value, picker, period), event);
      }}
      {...props}
    />
  );
}
